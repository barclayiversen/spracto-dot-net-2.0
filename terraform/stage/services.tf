resource "google_project_service" "appengine_googleapis_com" {
  project = var.project_number
  service = "appengine.googleapis.com"
}

resource "google_project_service" "appenginereporting_googleapis_com" {
  project = var.project_number
  service = "appenginereporting.googleapis.com"
}

resource "google_project_service" "artifactregistry_googleapis_com" {
  project = var.project_number
  service = "artifactregistry.googleapis.com"
}

resource "google_project_service" "datastore_googleapis_com" {
  project = var.project_number
  service = "datastore.googleapis.com"
}

resource "google_project_service" "storage_googleapis_com" {
  project = var.project_number
  service = "storage.googleapis.com"
}

resource "google_project_service" "containerregistry_googleapis_com" {
  project = var.project_number
  service = "containerregistry.googleapis.com"
}

resource "google_project_service" "cloudrun_googleapis_com" {
  project = var.project_number
  service = "run.googleapis.com"
}

resource "google_project_service" "cloudresourcemanager_googleapis_com" {
  project = var.project_number
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "sts_googleapis_com" {
  project = var.project_number
  service = "sts.googleapis.com"
}

resource "google_project_service" "iamcredentials_googleapis_com" {
  project = var.project_number
  service = "iamcredentials.googleapis.com"
}