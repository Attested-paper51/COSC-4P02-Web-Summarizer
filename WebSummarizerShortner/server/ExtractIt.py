from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route('/get-text', methods=['POST'])
def get_text_from_url():
    # Extract the URL from the incoming request
    data = request.json
    url = data.get('url')
    
    # Make sure a URL was provided
    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    # Make the GET request to fetch the HTML content
    response = requests.get(url)
    
    # Use BeautifulSoup to parse and extract text
    soup = BeautifulSoup(response.text, 'html.parser')
    text = soup.get_text(separator='\n', strip=True)
    
    # Return the extracted text
    return jsonify({"text": text})

if __name__ == '__main__':
    app.run(debug=True)
