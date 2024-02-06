terraform {
  backend "gcs" {
    bucket  = "legrant-net-tfstate"
    prefix  = "terraform/state"
  }
}