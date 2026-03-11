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
