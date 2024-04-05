from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

app = Flask(__name__)
CORS(app)  # Enable CORS


def extract_text_from_url(url):
    try:
        options = Options()
        options.headless = False
        logging.getLogger('urllib3.connectionpool').setLevel(logging.ERROR)
        browser = webdriver.Chrome(options=options)
        browser.get(url)
        time.sleep(5)  # Adjust this delay as needed
        page_source = browser.page_source
        browser.quit()
        soup = BeautifulSoup(page_source, 'html.parser')
        readable_text = soup.get_text(separator=' ', strip=True)
        return readable_text
    except Exception as e:
        logging.error(f"Error: {e}")
        return True, "issue with extraction"

@app.route('/get-text', methods=['POST'])
def get_url():
    data = request.json
    url = data.get('url')
    myText = extract_text_from_url(url)
    print(myText)
    return jsonify({"text": myText})

if __name__ == '__main__':
    app.run(debug=True)
