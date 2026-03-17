output "s3_bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "certificate_validation_records" {
  value = [
    for dvo in aws_acm_certificate.site.domain_validation_options : {
      domain = dvo.domain_name
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      value  = dvo.resource_record_value
    }
  ]
}

output "cost_card_lambda_function_name" {
  value = aws_lambda_function.cost_card_sync.function_name
}

output "cost_card_lambda_function_arn" {
  value = aws_lambda_function.cost_card_sync.arn
}

output "cost_card_event_rule_name" {
  value = aws_cloudwatch_event_rule.cost_card_daily_sync.name
}

output "cost_card_event_rule_arn" {
  value = aws_cloudwatch_event_rule.cost_card_daily_sync.arn
}

output "cost_card_object_key" {
  value = var.cost_card_object_key
}

output "contact_form_lambda_function_name" {
  value = aws_lambda_function.contact_form_send_email.function_name
}

output "contact_form_lambda_function_arn" {
  value = aws_lambda_function.contact_form_send_email.arn
}

output "contact_form_api_id" {
  value = aws_apigatewayv2_api.contact_form.id
}

output "contact_form_api_base_url" {
  value = aws_apigatewayv2_stage.contact_form.invoke_url
}

output "contact_form_endpoint_url" {
  value = "${aws_apigatewayv2_stage.contact_form.invoke_url}${var.contact_form_route_path}"
}
