resource "google_artifact_registry_repository" "spracto-net-repo" {
  location      = "us-west1"
  repository_id = "spracto-net-next"
  project       = var.project-id
  format        = "DOCKER"

  docker_config {
    immutable_tags = true
  }
}