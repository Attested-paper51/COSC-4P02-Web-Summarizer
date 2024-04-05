import requests

# The URL of the API endpoint
url = 'http://127.0.0.1:5000/api/summarize'

# The data to be sent to the API
data = {
    'text': 'To embed a graph we replace the vertices by steel rings and replace each edge with a spring to form a mechanical system . . . The vertices are placed in some initial layout and let go so that the spring forces on the rings move the system to a minimal energy state',
    'type': 0,
    'type': 0,
    'tone': 'Standard',
    'style': 'Paragraph',
    'length': 1,
    'option': 'Full Video',
}

# Making a POST request to the API
response = requests.post(url, json=data)

# Checking the response from the API
if response.status_code == 200:
    print("API call successful.")
    print("Response:", response.json())
else:
    print("API call failed.")
    print("Status Code:", response.status_code)
    print("Response:", response.text)
