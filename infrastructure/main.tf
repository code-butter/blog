terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.96"
    }
  }
}

provider "aws" {
  region = var.primary_region
}

provider  "aws" {
  alias = "cloudfront"
  region = "us-east-1"
}

locals {
  www_domain = "www.${var.domain}"
  blue_bucket = "${var.bucket}-blue"
  green_bucket = "${var.bucket}-green"
  switch_key = "key"
}

data "aws_caller_identity" "current" {}


