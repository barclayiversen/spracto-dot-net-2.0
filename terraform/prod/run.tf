resource "google_cloud_run_service" "spracto-net-prod" {
  name     = "spracto-net-next"
  location = "us-west1"

  template {
    spec {
      containers {
        image = "gcr.io/${var.project-id}/spracto-net-next:latest"
        env { 
          name = "DATASTORE_PROJECT_ID"
          value = var.project-id
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_domain_mapping" "prod-domain-mapping" {
  location = "us-west1"
  name     = "spracto.net"

  metadata {
    namespace = var.project-id
  }

  spec {
    route_name = google_cloud_run_service.spracto-net-prod.name
  }

}