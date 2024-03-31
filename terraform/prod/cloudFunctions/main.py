import base64
import json
from dotenv import load_dotenv
import os
import requests
from google.cloud import billing_v1
from google.cloud.billing_v1.types import ProjectBillingInfo
import google.api_core.exceptions

load_dotenv()

def send_discord_message(event, context):
    # 'event' parameter is a dictionary that contains data and metadata on the event
    # 'context' parameter contains the context of the event

    # Check if there is data in the Pub/Sub message
    if 'data' in event:
        message_data = base64.b64decode(event['data']).decode('utf-8')
        message_json = json.loads(message_data)
        # message = message_json.get('message', 'Default message')
        message = message_data
        # message = message_json
    else:
        message = 'Default message'

    webhook_url = os.environ.get('DISCORD_WEBHOOK_URL')
    prod_project_id = os.environ.get('PROD_PROJECT_ID')
    stage_project_id = os.environ.get('STAGE_PROJECT_ID')
    if not webhook_url:
        print('Webhook URL not set in environment variables')
        return 'Webhook URL not set in environment variables', 500

    data = {'content': message}
    if "costAmount" in message_json and message_json['costAmount']:
        cost = message_json['costAmount']
        print("COST EQUALS ", cost)
        if cost > 5:
            print("COST HAS EXCEEDED 5 dollars")

        if cost > 10:
            print('COST HAS EXCEEDED 10 DOLLARS')

        if cost > 49:
            print('DISABLING BILLING DUE TO COST')
            disable_billing_for_project(prod_project_id)
            disable_billing_for_project(stage_project_id)

    headers = {'Content-Type': 'application/json'}
    print("Pre flight", data)
    
    response = requests.post(webhook_url, json.dumps(data), headers=headers)

    if response.status_code == 204:
        print(f"Message sent to Discord successfully: {message}")
        return f"Message sent to Discord successfully: {message}"
    else:
        print(f"Failed to send message to Discord: {response.status_code}")
        return f"Failed to send message to Discord: {response.status_code}", response.status_code


def disable_billing_for_project(project_id):
    try:
        billing_client = billing_v1.CloudBillingClient()
        project_name = f"projects/{project_id}"
        project_billing_info = ProjectBillingInfo(billing_account_name="")
        billing_client.update_project_billing_info(name=project_name, project_billing_info=project_billing_info)
        print(f"Billing for project {project_id} has been successfully disabled.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error when trying to disable billing for project {project_id}: {e}")
    except Exception as e:
        print(f"Failed to disable billing for project {project_id} due to an unexpected error: {e}")