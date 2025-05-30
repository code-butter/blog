variable "primary_region" {
  type = string
}

variable "domain" {
  type = string
}

variable "bucket" {
  type = string
  description = "S3 bucket name that holds the static site"
}

variable "github_repo" {
  type = string
  description = "The source Github repo with the format of ORG_NAME/REPO_NAME"
}



output "github_role_arn" {
  value = aws_iam_role.github_actions.arn
}
