terraform {
  backend "gcs" {
    bucket  = "spracto-net-tfstate-stage"
    prefix  = "terraform/state"
  }
}

provider "google" {
  project = var.project-id
  region  = "us-west1"
}