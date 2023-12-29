resource "google_project_iam_member" "backend-roles" {
  count   = length(var.spracto-net-backend-roles)
  project = var.project-id
  role    = var.spracto-net-backend-roles[count.index]
  member  = "serviceAccount:${google_service_account.spracto_net_backend.email}"
}

resource "google_project_iam_member" "gh-actions-roles" {
  count   = length(var.spracto-net-gh-actions-roles)
  project = var.project-id
  role    = var.spracto-net-gh-actions-roles[count.index]
  member  = "serviceAccount:${google_service_account.spracto_net_gh_actions.email}"
}

resource "google_project_iam_member" "owner-role" {
  project = var.project-id
  role    = "roles/owner"
  member  = "user:${var.owner_email}"
}

resource "google_iam_workload_identity_pool" "gh-actions-pool" {
  workload_identity_pool_id = "github-actions"
  display_name              = "Github actions"
  description               = "For deploying with GH actions"
  disabled                  = false
  project                   = var.project-id
}

resource "google_iam_workload_identity_pool_provider" "github-actions" {
  display_name = "Github actions"
  project                            = var.project-id
  workload_identity_pool_id          = google_iam_workload_identity_pool.gh-actions-pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions"
  attribute_mapping                  = {
    "google.subject" = "assertion.sub",
    "attribute.actor" = "assertion.actor",
    "attribute.repository" = "assertion.repository"
  }
  oidc {
    issuer_uri        = "https://token.actions.githubusercontent.com"
  }
  attribute_condition = "assertion.repository=='barclayiversen/spracto-dot-net-2.0'"

}