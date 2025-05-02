resource "aws_s3_bucket" "this" {
  bucket = var.bucket
}

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.this.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id
  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = "*",
      Action = "s3:GetObject",
      Resource = "${aws_s3_bucket.this.arn}/*"
    }]
  })
  depends_on = [aws_s3_bucket_public_access_block.this]
}

resource "aws_cloudfront_function" "blog" {
  provider = aws.cloudfront
  name = "blog-url-handler"
  runtime = "cloudfront-js-2.0"
  code = file("${path.module}/functions/cloudfront-blog.js")
}

resource "aws_cloudfront_distribution" "site" {
  provider = aws.cloudfront
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Codebutter site"
  default_root_object = "index.html"

  aliases = [var.domain, local.www_domain]

  origin {
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name
    origin_id   = "siteOrigin"
  }


  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "siteOrigin"
    viewer_protocol_policy = "redirect-to-https"

    function_association {
      event_type = "viewer-request"
      function_arn = aws_cloudfront_function.blog.arn
    }

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
