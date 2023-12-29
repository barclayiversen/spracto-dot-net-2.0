terraform {
  backend "gcs" {
    bucket  = "spracto-net-tfstate-stage"
    prefix  = "terraform/state"
  }
}
