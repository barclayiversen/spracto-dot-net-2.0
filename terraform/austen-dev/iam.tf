resource "google_project_iam_member" "backend-roles" {
  count   = length(var.legrant-net-backend-roles)
  project = var.project-id
  role    = var.legrant-net-backend-roles[count.index]
  member  = "serviceAccount:${google_service_account.legrant_net_backend.email}"
}

resource "google_project_iam_member" "backend-role-prd" {
  count   = length(var.legrant-net-backend-roles-prd)
  project = var.prd_project_id
  role    = var.legrant-net-backend-roles-prd[count.index]
  member  = "serviceAccount:${google_service_account.legrant_net_backend.email}"
}

resource "google_project_iam_member" "gh-actions-roles" {
  count   = length(var.legrant-net-gh-actions-roles)
  project = var.project-id
  role    = var.legrant-net-gh-actions-roles[count.index]
  member  = "serviceAccount:${google_service_account.legrant_net_gh_actions.email}"
}

resource "google_project_iam_member" "owner-role" {
  project = var.project-id
  role    = "roles/owner"
  member  = "user:${var.owner_email}"
}

resource "google_iam_workload_identity_pool" "gh-actions-pool" {
  workload_identity_pool_id = "github-actions"
  display_name              = "github-actions"
  description               = "For github actions"
  disabled                  = false
  project                   = var.project-id
}

resource "google_iam_workload_identity_pool_provider" "github-actions" {
  display_name = "github"
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
   timeouts {
     
   }
}