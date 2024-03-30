import requests

endpoint = "https://extractorapi.com/api/v1/extractor"
params = {
  "apikey": "YOUR_API_KEY",
  "url": "https://cosc.brocku.ca/~bockusd/3p94/seminartopic1.htm"
}

r = requests.get(endpoint, params=params)

#print(r.json())
json_response = r.json()
extracted_text = json_response.get('text', 'Text Not Found')
<<<<<<< HEAD
<<<<<<< HEAD
print(extracted_text)
=======
print(extracted_text)
>>>>>>> TextExtraction
=======

print(extracted_text)
>>>>>>> 592047b919cb6fba476e680ef5e4a51fd8f057f5
