# resource "google_pubsub_topic" "budget_alerts_topic" {
#   name = "budget-alerts-topic"
# }

resource "google_cloudfunctions_function" "budget_alert_function" {
  name        = "budget-alert-function"
  description = "Function to process budget alerts"
  runtime     = "python38"

  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.spracto_net_tfstate.name
  source_archive_object = google_storage_bucket_object.function_source.name

  entry_point           = "send_discord_message"

  event_trigger {
    event_type = "google.pubsub.topic.publish"
    resource   = "budget"
    failure_policy {
      retry = true
    }
  }

  environment_variables = {
    "DISCORD_WEBHOOK_URL" = var.discord_url
  }


}

data "archive_file" "function_zip" {
  type        = "zip"
  source_dir  = "${path.module}/cloudFunctions"
  output_path = "${path.module}/budget_alert.zip"
}

resource "google_storage_bucket_object" "function_source" {
  name   = "budget_alert_function-${data.archive_file.function_zip.output_md5}.zip"
  bucket = google_storage_bucket.spracto_net_tfstate.name
  source = data.archive_file.function_zip.output_path
  depends_on = [data.archive_file.function_zip]
}



# IAM binding to allow the Cloud Function to subscribe to the Pub/Sub topic
resource "google_pubsub_topic_iam_binding" "pubsub_binding" {
  topic = "budget"

  role = "roles/pubsub.subscriber"

  members = [
    "serviceAccount:${google_cloudfunctions_function.budget_alert_function.service_account_email}",
  ]
}
