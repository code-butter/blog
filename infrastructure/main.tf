terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_token
}


resource "cloudflare_pages_project" "static_site" {
  account_id = var.account_id
  name       = var.project_name
  production_branch = var.prod_branch
}

resource "cloudflare_pages_domain" "main" {
  count  = var.host == null ? 0 : 1
  account_id = var.account_id
  project_name = cloudflare_pages_project.static_site.name
  name = var.host
}


resource "cloudflare_zone" "main" {
  account = {
    id = var.account_id
  }
  name = var.zone_domain
  type = "full"
  count = var.zone_domain == null ? 0 : 1
}

resource "cloudflare_dns_record" "main" {
  count = var.zone_domain == null ? 0 : (var.host == null ? 0 : 1)
  zone_id = cloudflare_zone.main[0].id
  name = var.host == var.zone_domain ? var.host : replace(var.host, var.zone_domain, "")
  type = "CNAME"
  content = "${cloudflare_pages_project.static_site.name}.pages.dev"
  proxied = true
  ttl = 1
}

resource "cloudflare_dns_record" "www" {
  count = var.zone_domain == null ? 0 : (var.use_www ? 1 : 0)
  zone_id = cloudflare_zone.main[0].id
  name = "www.${var.zone_domain}"
  type = "CNAME"
  content = "${cloudflare_pages_project.static_site.name}.pages.dev"
  proxied = true
  ttl = 1
}

resource "cloudflare_dns_record" "spf" {
  count = var.zone_domain == null ? 0 : 1
  zone_id = cloudflare_zone.main[0].id
  name = var.zone_domain
  type = "TXT"
  content = "v=spf1 -all"
  ttl = 3200
}

resource "cloudflare_dns_record" "dkim" {
  count = var.zone_domain == null ? 0 : 1
  zone_id = cloudflare_zone.main[0].id
  name = "*._domainkey.${var.zone_domain}"
  type = "TXT"
  content = "v=DKIM1; p="
  ttl = 3200
}

resource "cloudflare_dns_record" "dmarc" {
  count = var.zone_domain == null ? 0 : 1
  zone_id = cloudflare_zone.main[0].id
  name = "_dmarc.${var.zone_domain}"
  type = "TXT"
  content = "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;"
  ttl = 3200
}