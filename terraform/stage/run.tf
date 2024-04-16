resource "google_cloud_run_service" "spracto-net-stage" {
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
        env {
          name  = "BUCKET_NAME" 
          value = "spracto-net-images"
        }
        env {
            name  = "GCS_PROJECT_ID"
            value = var.prd_project_id
        }
        env {
            name  = "GOOGLE_CLIENT_ID"
            value = var.client_id
        }
        env {
            name  = "GOOGLE_CLIENT_SECRET"
            value = var.client_secret
        }
        env {
            name  = "NEXTAUTH_SECRET"
            value = var.next_secret
        }
        env {
            name  = "NEXTAUTH_URL"
            value = "https://stage.spracto.net"
        }
        env {
            name  = "NEXT_PUBLIC_BASE_URL"
            value = "https://stage.spracto.net"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_compute_region_network_endpoint_group" "cloud_run_neg" {
  name                  = "cloud-run-neg"
  network_endpoint_type = "SERVERLESS"
  region                = "us-west1"
  cloud_run {
    service = google_cloud_run_service.spracto-net-stage.name
  }
}