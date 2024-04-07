# resource "google_storage_bucket" "spracto_net_images" {
#   force_destroy            = false
#   location                 = "US-WEST1"
#   name                     = "spracto-net-images-stage"
#   project                  = var.project-id
#   public_access_prevention = "inherited"
#   storage_class            = "STANDARD"
# }

resource "google_storage_bucket" "spracto_net_tfstate" {
  force_destroy            = false
  location                 = "US-WEST1"
  name                     = "spracto-net-tfstate-stage"
  project                  = var.project-id
  public_access_prevention = "enforced"
  storage_class            = "STANDARD"
}