import requests
from oauth2client.service_account import ServiceAccountCredentials
import gspread
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
# Replace with your Jira instance details
jira_url = os.getenv("JIRA_URL")
jira_filter_id = os.getenv("JIRA_FILTER_ID")
api_key = os.getenv("JIRA_API_KEY")

# Replace with your Google Sheet credentials
scope = ['https://www.googleapis.com/auth/spreadsheets',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name(
    'account-key.json', scope)
client = gspread.authorize(creds)

# Get the Google Sheet
# sheet = client.open('Your Sheet Name').worksheet('JiraData')
# Replace with your Google Sheet ID
# Get the Google Sheet
sheet_id = os.getenv("GOOGLE_SHEET_ID")

# Get the Google Sheet
sheet = client.open_by_key(sheet_id).worksheet('JiraData')

# Function to fetch Jira data


def fetch_jira_data(filter_id, api_key):
    # url = f"{jira_url}/rest/api/latest/search?jql=filter={filter_id}"
    # headers = {'Authorization': f'Bearer {api_key}',
    #            'Accept': 'application/json'}
    # response = requests.get(url, headers=headers)

    max_results = 200
    url = f"{
        jira_url}/rest/api/latest/search?jql=filter={filter_id}&maxResults={max_results}"
    auth = (os.getenv("JIRA_EMAIL"), api_key)
    headers = {'Accept': 'application/json'}
    response = requests.get(url, headers=headers, auth=auth)

    if response.status_code == 200:
        data = response.json()
        # print(data)
        return data.get('issues', [])
    else:
        print(f"Failed to fetch data from Jira: {
              response.status_code} - {response.text}")
        return []


# Fetch Jira data
jira_data = fetch_jira_data(jira_filter_id, api_key)

# Populate Google Sheet
header_row = ['Issue Key', 'Summary', 'Status', 'Assignee']
sheet.insert_row(header_row, 1)

for issue in jira_data:
    row = [
        issue['key'],
        issue['fields']['summary'],
        issue['fields']['status']['name'],
        issue['fields']['assignee']['displayName'] if issue['fields']['assignee'] else 'Unassigned'
    ]
    sheet.insert_row(row)

print("Jira data populated to Google Sheet.")
