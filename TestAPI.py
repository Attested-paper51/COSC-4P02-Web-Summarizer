import requests

url = "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1"

with open('.env') as f:
    APIkey = f.readline()

payload = {
	"language": "english",
	"summary_percent": 10,
	"text": "Brock University protects your privacy and your personal information. The personal information requested on this page is collected under the authority of The Brock University Act, 1964, and in accordance with the Freedom of Information and Protection of Privacy Act (FIPPA). The information provided will be used by the University to continue the conversation with you about being a Brock student. As part of our remarketing campaigns, you may also see advertising or messaging from the university on other sites on the internet. We acknowledge the land on which Brock University was built is the traditional territory of the Haudenosaunee and Anishinaabe peoples, many of whom continue to live and work here today. This territory is covered by the Upper Canada Treaties and is within the land protected by the Dish with One Spoon Wampum agreement. Today this gathering place is home to many First Nations, Metis, and Inuit peoples and acknowledging reminds us that our great standard of living is directly related to the resources and friendship of Indigenous people."
}

headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": APIkey,
	"X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())