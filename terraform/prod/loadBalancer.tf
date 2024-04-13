resource "google_compute_global_address" "default" {
  name = "snp-lb-ip"
}

resource "google_compute_managed_ssl_certificate" "default" {
  name    = "ssl-cert"
  managed {
    domains = ["spracto.net"]
  }
}

resource "google_compute_url_map" "default" {
  name            = "web-map"
  default_service = google_compute_backend_service.default.id
}

resource "google_compute_backend_service" "default" {
  name        = "backend-service"
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 30

  backend {
    group = google_compute_region_network_endpoint_group.cloud_run_neg.id
  }

  security_policy = google_compute_security_policy.default.self_link
}



resource "google_compute_target_http_proxy" "default" {
  name    = "http-lb-proxy"
  url_map = google_compute_url_map.default.id
}

resource "google_compute_target_https_proxy" "default" {
  name             = "https-lb-proxy"
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_global_forwarding_rule" "http" {
  name       = "http-content-rule"
  ip_address = google_compute_global_address.default.address
  port_range = "80"
  target     = google_compute_target_http_proxy.default.id
}

resource "google_compute_global_forwarding_rule" "https" {
  name       = "https-content-rule"
  ip_address = google_compute_global_address.default.address
  port_range = "443"
  target     = google_compute_target_https_proxy.default.id
}

resource "google_compute_security_policy" "default" {
  name = "spracto-net-security-policy"

  // Rule to allow requests to the root path
  rule {
    action   = "allow"
    priority = "1000"
    match {
      expr {
        expression = "request.path == '/'"
      }
    }
    description = "Allow requests to root path"
  }

  // Rule to allow requests to the /admin path
  rule {
    action   = "allow"
    priority = "900"
    match {
      expr {
        expression = "request.path.startsWith('/admin')"
      }
    }
    description = "Allow requests to admin path"
  }

  // Default rule to deny all other requests
  rule {
    action   = "deny(403)"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Deny all other requests"
  }
}





# Output the IP address
output "lb_ip_address" {
  value = google_compute_global_address.default.address
}
