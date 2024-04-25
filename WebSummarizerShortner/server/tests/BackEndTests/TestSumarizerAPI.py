import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Set key
api_key = os.getenv("SHORTIFY_KEY")

# The URL of the API endpoint
url = 'http://127.0.0.1:5000/api/summarize'

# The data to be sent to the API
data = {
    'key' : api_key,
    'input': "https://www.youtube.com/watch?v=qYvXk_bqlBk",
    'type': 2,
    'tone': 'Standard',
    'style': 'Paragraph',
    'length': 'short',
    'option' : "Timestamp",
    'startTime' : "00:10",
    'endTime' : "00:15"
}

print(f"\n\nthe key: {api_key}")

# Making a POST request to the API
try:
    response = requests.post(url, json=data)
except requests.exceptions.RequestException as e:
    print(e)

# Checking the response from the API
if response.status_code == 200:
    print("API call successful.")
    print("Response:", response.json())
else:
    print("API call failed.")
    print("Status Code:", response.status_code)
    print("Response:", response.text)
