import requests
def processURL(url):
    endpoint = "https://extractorapi.com/api/v1/extractor"
    params = {
        "apikey": "f1fe711b72df1cfa3ad4ff5c1ac8ccc8c8eba7b6",
        "url": url
    }

    r = requests.get(endpoint, params=params)

    # print(r.json())
    json_response = r.json()
    extracted_text = json_response.get('text', 'Text Not Found')

    return extracted_text
