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


