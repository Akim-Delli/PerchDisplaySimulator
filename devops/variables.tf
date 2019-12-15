variable "postgresql_version" {
  default = "POSTGRES_9_6"
}

variable "region" {
  default = "us-east1"
}

variable "db_password" {
  description = "postgres database user password"
}