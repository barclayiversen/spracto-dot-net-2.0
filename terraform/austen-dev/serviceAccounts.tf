resource "google_service_account" "legrant_net_gh_actions" {
  account_id   = "${var.prefix}-net-gh-actions"
  description  = "for deploying with github actions"
  display_name = "${var.prefix}-net-gh-actions"
  project      = var.project-id
}

resource "google_service_account" "legrant_net_backend" {
  account_id   = "${var.prefix}-net-backend"
  display_name = "${var.prefix}-net-backend"
  project      = var.project-id
}

resource "google_service_account" "legrant_net_frontend" {
  account_id   = "${var.prefix}-net-frontend"
  display_name = "${var.prefix}-net-frontend"
  project      = var.project-id
}