locals {
  www_domain = "www.${var.domain_name}"
}

resource "aws_s3_bucket" "site" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "oac-${var.domain_name}"
  description                       = "OAC for ${var.domain_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_acm_certificate" "site" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = [local.www_domain]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for dvo in aws_acm_certificate.site.domain_validation_options : dvo.resource_record_name]
}

data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_function" "rewrite_index" {
  name    = "rewrite-index-${replace(var.domain_name, ".", "-")}"
  runtime = "cloudfront-js-1.0"
  comment = "Rewrite URIs to index.html for static export"
  publish = true

  code = <<-EOT
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
EOT
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Portfolio ${var.domain_name}"
  default_root_object = "index.html"
  aliases             = [var.domain_name, local.www_domain]

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite_index.arn
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  depends_on = [aws_acm_certificate_validation.site]
}

data "aws_iam_policy_document" "site_bucket_policy" {
  statement {
    sid    = "AllowCloudFrontReadOnly"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_bucket_policy.json
}

data "aws_caller_identity" "current" {}

data "archive_file" "cost_card_lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../lambda/cost-card/index.mjs"
  output_path = "${path.module}/.terraform/cost-card-lambda.zip"
}

data "aws_iam_policy_document" "cost_card_lambda_assume_role" {
  statement {
    effect = "Allow"
    actions = [
      "sts:AssumeRole",
    ]

    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com",
      ]
    }
  }
}

resource "aws_iam_role" "cost_card_lambda" {
  name               = var.cost_card_role_name
  description        = "Role for Lambda that generates cost JSON for portfolio card"
  assume_role_policy = data.aws_iam_policy_document.cost_card_lambda_assume_role.json
}

data "aws_iam_policy_document" "cost_card_lambda_permissions" {
  statement {
    sid    = "AllowLogsWrite"
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = [
      "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*",
    ]
  }

  statement {
    sid    = "AllowCostExplorerRead"
    effect = "Allow"
    actions = [
      "ce:GetCostAndUsage",
      "ce:GetCostForecast",
    ]
    resources = [
      "*",
    ]
  }

  statement {
    sid    = "AllowCostJsonReadWrite"
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:PutObject",
    ]
    resources = [
      "${aws_s3_bucket.site.arn}/${var.cost_card_object_key}",
    ]
  }
}

resource "aws_iam_policy" "cost_card_lambda" {
  name   = var.cost_card_policy_name
  policy = data.aws_iam_policy_document.cost_card_lambda_permissions.json
}

resource "aws_iam_role_policy_attachment" "cost_card_lambda" {
  role       = aws_iam_role.cost_card_lambda.name
  policy_arn = aws_iam_policy.cost_card_lambda.arn
}

resource "aws_lambda_function" "cost_card_sync" {
  function_name    = var.cost_card_function_name
  role             = aws_iam_role.cost_card_lambda.arn
  runtime          = var.cost_card_lambda_runtime
  handler          = "index.handler"
  filename         = data.archive_file.cost_card_lambda_zip.output_path
  source_code_hash = data.archive_file.cost_card_lambda_zip.output_base64sha256
  memory_size      = var.cost_card_lambda_memory_size
  timeout          = var.cost_card_lambda_timeout

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.site.bucket
      OBJECT_KEY  = var.cost_card_object_key
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.cost_card_lambda,
  ]
}

resource "aws_cloudwatch_event_rule" "cost_card_daily_sync" {
  name                = var.cost_card_event_rule_name
  description         = "Ejecuta ${var.cost_card_function_name} diariamente"
  schedule_expression = var.cost_card_schedule_expression
  state               = "ENABLED"
}

resource "aws_cloudwatch_event_target" "cost_card_lambda_target" {
  rule      = aws_cloudwatch_event_rule.cost_card_daily_sync.name
  target_id = var.cost_card_event_target_id
  arn       = aws_lambda_function.cost_card_sync.arn
}

resource "aws_lambda_permission" "allow_eventbridge_cost_card_daily_sync" {
  statement_id  = var.cost_card_lambda_permission_statement_id
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cost_card_sync.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.cost_card_daily_sync.arn
}

data "archive_file" "contact_form_lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../lambda/contact-form/index.mjs"
  output_path = "${path.module}/.terraform/contact-form-lambda.zip"
}

resource "aws_ses_email_identity" "contact_form_sender" {
  email = var.contact_form_from_email
}

resource "aws_ses_email_identity" "contact_form_recipient" {
  count = var.contact_form_to_email != var.contact_form_from_email ? 1 : 0
  email = var.contact_form_to_email
}

resource "aws_iam_role" "contact_form_lambda" {
  name               = var.contact_form_role_name
  description        = "Role for Lambda that sends contact form emails through SES"
  assume_role_policy = data.aws_iam_policy_document.cost_card_lambda_assume_role.json
}

data "aws_iam_policy_document" "contact_form_lambda_permissions" {
  statement {
    sid    = "AllowLogsWrite"
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = [
      "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*",
    ]
  }

  statement {
    sid    = "AllowSesSendEmail"
    effect = "Allow"
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
    ]
    resources = [
      aws_ses_email_identity.contact_form_sender.arn,
    ]
  }
}

resource "aws_iam_policy" "contact_form_lambda" {
  name   = var.contact_form_policy_name
  policy = data.aws_iam_policy_document.contact_form_lambda_permissions.json
}

resource "aws_iam_role_policy_attachment" "contact_form_lambda" {
  role       = aws_iam_role.contact_form_lambda.name
  policy_arn = aws_iam_policy.contact_form_lambda.arn
}

resource "aws_lambda_function" "contact_form_send_email" {
  function_name    = var.contact_form_function_name
  role             = aws_iam_role.contact_form_lambda.arn
  runtime          = var.contact_form_lambda_runtime
  handler          = "index.handler"
  filename         = data.archive_file.contact_form_lambda_zip.output_path
  source_code_hash = data.archive_file.contact_form_lambda_zip.output_base64sha256
  memory_size      = var.contact_form_lambda_memory_size
  timeout          = var.contact_form_lambda_timeout

  environment {
    variables = {
      FROM_EMAIL      = var.contact_form_from_email
      TO_EMAIL        = var.contact_form_to_email
      ALLOWED_ORIGINS = join(",", var.contact_form_allowed_origins)
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.contact_form_lambda,
  ]
}

resource "aws_apigatewayv2_api" "contact_form" {
  name          = var.contact_form_api_name
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.contact_form_allowed_origins
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_integration" "contact_form_lambda" {
  api_id                 = aws_apigatewayv2_api.contact_form.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form_send_email.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact_form_post" {
  api_id    = aws_apigatewayv2_api.contact_form.id
  route_key = "POST ${var.contact_form_route_path}"
  target    = "integrations/${aws_apigatewayv2_integration.contact_form_lambda.id}"
}

resource "aws_apigatewayv2_stage" "contact_form" {
  api_id      = aws_apigatewayv2_api.contact_form.id
  name        = var.contact_form_api_stage_name
  auto_deploy = true
}

resource "aws_lambda_permission" "allow_apigateway_contact_form" {
  statement_id  = "AllowApiGatewayContactFormInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form_send_email.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_form.execution_arn}/*/*"
}
