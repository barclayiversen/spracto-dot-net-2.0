terraform {
  backend "gcs" {
    bucket  = "spracto-net-tfstate-prod"
    prefix  = "terraform/state"
  }
}
