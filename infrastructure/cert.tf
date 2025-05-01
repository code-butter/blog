resource "aws_acm_certificate" "cert" {
  provider                  = aws.cloudfront
  domain_name               = var.domain
  validation_method         = "DNS"
  subject_alternative_names = [local.www_domain]
}

resource "aws_acm_certificate_validation" "cert_validation" {
  provider                = aws.cloudfront
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}