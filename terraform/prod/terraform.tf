terraform {
  backend "gcs" {
    bucket  = "spracto-net-tfstate-prod"
    prefix  = "terraform/state"
  }
}

provider "google" {
  project = var.project-id
  region  = "us-west1"
}