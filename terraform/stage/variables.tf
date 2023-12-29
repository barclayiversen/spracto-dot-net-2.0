variable "project-id" {
    description = "project id"
}

variable "sa_backend" {
    description = "Service account for backend"
}

variable "sa_gh_actions" {
  description = "Service account for GH actions"
}

variable "owner_email" {
  description = "Owner email"
}

variable "project_number" {
  description = "Project number"
}

variable "state_bucket" {
  description = "For TF state"
}

variable "spracto-net-backend-roles" {
  description = "List of IAM roles for backend SA"
  type        = list(string)
  default     = ["roles/datastore.user", "roles/datastore.viewer"]  # Example roles
}

variable "spracto-net-gh-actions-roles" {
  description = "List of IAM roles for gh actions SA"
  type        = list(string)
  default     = ["roles/appengine.deployer", "roles/appengine.appAdmin", "roles/cloudbuild.builds.editor", "roles/run.admin", "roles/iam.serviceAccountUser", "roles/storage.admin"]  # Example roles
}