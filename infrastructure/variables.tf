variable "cloudflare_token" {
  type = string
  sensitive = true
}

variable "account_id" {
  type = string
}

variable "project_name" {
  type = string
}

variable "prod_branch" {
  type = string
  default = "main"
}

variable "host" {
  type = string
  default = null
}

variable "zone_domain" {
  type = string
  default = null
}

variable "use_www" {
  type = bool
  default = false
}

variable "github_owner" {
  type = string
}

variable "github_repo" {
  type = string
}