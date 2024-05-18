# resource "google_compute_global_address" "default" {
#   name = "sns-lb-ip"
# }

# resource "google_compute_managed_ssl_certificate" "default" {
#   name    = "ssl-cert"
#   managed {
#     domains = ["stage.spracto.net"]
#   }
# }

# resource "google_compute_url_map" "default" {
#   name            = "web-map"
#   default_service = google_compute_backend_service.default.id
# }

# resource "google_compute_backend_service" "default" {
#   name        = "backend-service"
#   port_name   = "http"
#   protocol    = "HTTP"
#   timeout_sec = 30

#   backend {
#     group = google_compute_region_network_endpoint_group.cloud_run_neg.id
#   }

#   security_policy = google_compute_security_policy.default.self_link
# }

# resource "google_compute_target_http_proxy" "default" {
#   name    = "http-lb-proxy"
#   url_map = google_compute_url_map.default.id
# }

# resource "google_compute_target_https_proxy" "default" {
#   name             = "https-lb-proxy"
#   url_map          = google_compute_url_map.default.id
#   ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
# }

# resource "google_compute_global_forwarding_rule" "http" {
#   name       = "http-content-rule"
#   ip_address = google_compute_global_address.default.address
#   port_range = "80"
#   target     = google_compute_target_http_proxy.default.id
# }

# resource "google_compute_global_forwarding_rule" "https" {
#   name       = "https-content-rule"
#   ip_address = google_compute_global_address.default.address
#   port_range = "443"
#   target     = google_compute_target_https_proxy.default.id
# }

# resource "google_compute_security_policy" "default" {
#   name = "spracto-net-security-policy"

#   // Allow requests to the root path
#   rule {
#     action = "allow"
#     priority = "1000"
#     match {
#       expr {
#         expression = "request.path == '/'"
#       }
#     }
#     description = "Allow base path"
#   }

#   // Allow requests to the /admin path
#   rule {
#     action = "allow"
#     priority = "990"
#     match {
#       expr {
#         expression = "request.path == '/admin'"
#       }
#     }
#     description = "Allow admin path"
#   }

#   // Allow requests to the /_next path
#   rule {
#     action = "allow"
#     priority = "980"
#     match {
#       expr {
#         expression = "request.path.startsWith('/_next')"
#       }
#     }
#     description = "Allow Next.js static assets"
#   }

#   // Allow requests to the /api path
#   # rule {
#   #   action = "allow"
#   #   priority = "970"
#   #   match {
#   #     expr {
#   #       expression = "request.path.startsWith('/api')"
#   #     }
#   #   }
#   #   description = "Allow API endpoints"
#   # }

#     rule {
#     action = "allow"
#     priority = "970"
#     match {
#       expr {
#         expression = "request.path.startsWith('/api/auth')"
#       }
#     }
#     description = "Allow API auth endpoints"
#   }

#     rule {
#     action = "allow"
#     priority = "960"
#     match {
#       expr {
#         expression = "request.path.startsWith('/api/datastore')"
#       }
#     }
#     description = "Allow API auth endpoints"
#   }

 
#      rule {
#     action = "allow"
#     priority = "950"
#     match {
#       expr {
#         expression = "request.path == '/api/about'"
#       }
#     }
#     description = "Allow API endpoints"
#   }

  
#      rule {
#     action = "allow"
#     priority = "940"
#     match {
#       expr {
#         expression = "request.path == '/api/upcomingShow'"
#       }
#     }
#     description = "Allow API endpoints"
#   }

  
#      rule {
#     action = "allow"
#     priority = "930"
#     match {
#       expr {
#         expression = "request.path == '/api/featuredRelease'"
#       }
#     }
#     description = "Allow API endpoints"
#   }

#      rule {
#     action = "allow"
#     priority = "920"
#     match {
#       expr {
#         expression = "request.path == '/api/upcomingRelease'"
#       }
#     }
#     description = "Allow API endpoints"
#   }

  
#      rule {
#     action = "allow"
#     priority = "910"
#     match {
#       expr {
#         expression = "request.path == '/api/images'"
#       }
#     }
#     description = "Allow API endpoints"
#   }
#     // Allow background video
#   rule {
#     action = "allow"
#     priority = "900"
#     match {
#       expr {
#         expression = "request.path == '/bgvideo.mp4'"
#       }
#     }
#     description = "Allow bg video to load"
#   }

#      // Allow background video poster
#   rule {
#     action = "allow"
#     priority = "890"
#     match {
#       expr {
#         expression = "request.path == '/poster.png'"
#       }
#     }
#     description = "Allow poster to load"
#   }

#     rule {
#     action = "allow"
#     priority = "880"
#     match {
#       expr {
#         expression = "request.path == '/favicon.ico'"
#       }
#     }
#     description = "Allow favicon to load"
#   }

#   // Default rule to deny all other requests
#   rule {
#     action   = "deny(403)"
#     priority = "2147483647"
#     match {
#       versioned_expr = "SRC_IPS_V1"
#       config {
#         src_ip_ranges = ["*"]
#       }
#     }
#     description = "Deny all other requests"
#   }

#   # adaptive_protection_config {
#   #   layer_7_ddos_defense_config {
#   #     enable = false
#   #   }
#   # }
# }

# # Output the IP address
# output "lb_ip_address" {
#   value = google_compute_global_address.default.address
# }
