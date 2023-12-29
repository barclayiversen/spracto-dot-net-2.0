resource "google_service_account" "spracto_net_gh_actions" {
  account_id   = "spracto-net-gh-actions"
  description  = "for deploying with github actions"
  display_name = "spracto-net-gh-actions"
  project      = var.project-id
}

resource "google_service_account" "spracto_net_backend" {
  account_id   = "spracto-net-backend"
  display_name = "spracto-net-backend"
  project      = var.project-id
}

