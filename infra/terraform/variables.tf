variable "aws_profile" {
  description = "Perfil AWS CLI local"
  type        = string
  default     = "gian"
}

variable "aws_region" {
  description = "Region principal para recursos"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Dominio principal del sitio"
  type        = string
}

variable "cost_card_object_key" {
  description = "Ruta del JSON de costos dentro del bucket S3"
  type        = string
  default     = "aws/costs/latest.json"
}

variable "cost_card_function_name" {
  description = "Nombre de la Lambda que sincroniza costos"
  type        = string
  default     = "CostCardDataSync"
}

variable "cost_card_lambda_runtime" {
  description = "Runtime de la Lambda de costos"
  type        = string
  default     = "nodejs20.x"
}

variable "cost_card_lambda_memory_size" {
  description = "Memoria (MB) para Lambda de costos"
  type        = number
  default     = 256
}

variable "cost_card_lambda_timeout" {
  description = "Timeout (segundos) para Lambda de costos"
  type        = number
  default     = 30
}

variable "cost_card_role_name" {
  description = "Nombre del rol IAM usado por Lambda de costos"
  type        = string
  default     = "CostCardLambdaRole"
}

variable "cost_card_policy_name" {
  description = "Nombre de la policy IAM para Lambda de costos"
  type        = string
  default     = "CostCardLambdaPolicy"
}

variable "cost_card_event_rule_name" {
  description = "Nombre de la regla EventBridge para ejecucion diaria"
  type        = string
  default     = "CostCardDailySync"
}

variable "cost_card_event_target_id" {
  description = "Target ID del trigger EventBridge -> Lambda"
  type        = string
  default     = "CostCardLambdaTarget"
}

variable "cost_card_schedule_expression" {
  description = "Expresion cron/rate para ejecutar la sincronizacion de costos"
  type        = string
  default     = "cron(0 13 * * ? *)"
}

variable "cost_card_lambda_permission_statement_id" {
  description = "Statement ID del permiso Lambda invocado por EventBridge"
  type        = string
  default     = "AllowEventBridgeCostCardDailySync"
}

variable "contact_form_function_name" {
  description = "Nombre de la Lambda que envia correos del formulario"
  type        = string
  default     = "ContactFormSendEmail"
}

variable "contact_form_lambda_runtime" {
  description = "Runtime de la Lambda del formulario de contacto"
  type        = string
  default     = "nodejs20.x"
}

variable "contact_form_lambda_memory_size" {
  description = "Memoria (MB) para Lambda de formulario"
  type        = number
  default     = 256
}

variable "contact_form_lambda_timeout" {
  description = "Timeout (segundos) para Lambda de formulario"
  type        = number
  default     = 20
}

variable "contact_form_role_name" {
  description = "Nombre del rol IAM usado por Lambda de formulario"
  type        = string
  default     = "ContactFormLambdaRole"
}

variable "contact_form_policy_name" {
  description = "Nombre de la policy IAM para Lambda de formulario"
  type        = string
  default     = "ContactFormLambdaPolicy"
}

variable "contact_form_api_name" {
  description = "Nombre del API Gateway HTTP para formulario de contacto"
  type        = string
  default     = "ContactFormHttpApi"
}

variable "contact_form_api_stage_name" {
  description = "Stage del API Gateway para formulario"
  type        = string
  default     = "prod"
}

variable "contact_form_route_path" {
  description = "Ruta HTTP del formulario dentro del API"
  type        = string
  default     = "/contact"
}

variable "contact_form_allowed_origins" {
  description = "Orígenes permitidos para CORS del API de contacto"
  type        = list(string)
  default     = ["https://gianpc.com", "https://www.gianpc.com", "http://localhost:3000"]
}

variable "contact_form_from_email" {
  description = "Correo verificado en SES que envia los mensajes"
  type        = string
  default     = "gpaucarcortez@gmail.com"
}

variable "contact_form_to_email" {
  description = "Correo destino que recibira los mensajes del formulario"
  type        = string
  default     = "gpaucarcortez@gmail.com"
}
