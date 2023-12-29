resource "google_project_iam_member" "backend-roles" {
  count   = length(var.spracto-net-backend-roles)
  project = var.project-id
  role    = var.spracto-net-backend-roles[count.index]
  member  = "serviceAccount:${var.sa_backend}"
}

resource "google_project_iam_member" "gh-actions-roles" {
  count   = length(var.spracto-net-gh-actions-roles)
  project = var.project-id
  role    = var.spracto-net-gh-actions-roles[count.index]
  member  = "serviceAccount:${var.sa_gh_actions}"
}

resource "google_project_iam_member" "owner-role" {
  project = var.project-id
  role    = "roles/owner"
  member  = "user:${var.owner_email}"
}


