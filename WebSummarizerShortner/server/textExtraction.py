import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

def extract_text_from_url(url):
    try:
        options = Options()
        options.headless = True
        logging.getLogger('urllib3.connectionpool').setLevel(logging.ERROR)
        browser = webdriver.Chrome(options=options)
        browser.get(url)
        time.sleep(5)  # Adjust this delay as needed
        page_source = browser.page_source
        browser.quit()
        soup = BeautifulSoup(page_source, 'html.parser')
        readable_text = soup.get_text(separator=' ', strip=True)
        return False, readable_text
    except Exception as e:
        logging.error(f"Error: {e}")
        return True, "error processing url"

