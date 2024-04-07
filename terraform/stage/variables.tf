variable "project-id" {
    description = "project id"
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
  default     = ["roles/datastore.user", "roles/datastore.viewer", "roles/storage.objectCreator"]  # Example roles
}

//Anti pattern
variable "spracto-net-backend-roles-prd" {
  description = "List of IAM roles for backend SA"
  type        = list(string)
  default     = ["roles/storage.objectCreator", "roles/storage.objectUser"]  # Example roles
}

variable "prd_project_id" {
  description = "alt prj id"
}


variable "spracto-net-gh-actions-roles" {
  description = "List of IAM roles for gh actions SA"
  type        = list(string)
  default     = ["roles/cloudbuild.builds.editor", "roles/run.admin", "roles/iam.serviceAccountUser", "roles/storage.admin", "roles/iam.workloadIdentityUser"]  # Example roles
}