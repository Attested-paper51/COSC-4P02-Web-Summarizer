import pytest
from WebTextExtraction import app
import time
from unittest.mock import patch, MagicMock

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def mock_selenium(mocker):
    mock_browser = mocker.patch('selenium.webdriver.Chrome')
    mock_browser_instance = MagicMock()
    mock_browser.return_value = mock_browser_instance
    mock_browser_instance.page_source = "<html><body>Mocked Text</body></html>"
    return mock_browser_instance

@pytest.fixture
def mock_bs4(mocker):
    mocker.patch('bs4.BeautifulSoup.get_text', return_value="Mocked Text")

def test_extract_text_from_url(client, mock_selenium, mock_bs4):
    # This test will use the mock_selenium and mock_bs4 fixtures
    response = client.post('/get-text', json={'url': 'https://cosc.brocku.ca/~bockusd/3p94/seminartopic1.htm'})
    assert response.status_code == 200
    assert response.json == {'text': 'Mocked Text'}

def test_extract_text_from_url_with_error(client, mock_selenium, mock_bs4):
    # Simulate an error in web scraping
    mock_selenium.get.side_effect = Exception("Mock Exception")
    response = client.post('/get-text', json={'url': 'https://www.britannica.com/topic/Apple-Inc/After-Jobs-Tim-Cook-as-CEO-and-the-first-trillion-dollar-company'})
    assert response.status_code == 400
    assert response.json == {'error': 'Could not extract text, possibly due to non-HTML content or other errors'}

def test_extract_text_from_invalid_url(client, mock_selenium, mock_bs4):
    invalid_url = 'http://www.invalid.com/'
    mock_selenium.get.side_effect = Exception("Invalid URL")
    response = client.post('/get-text', json={'url': invalid_url})
    assert response.status_code == 400
    assert response.json == {'error': 'Could not extract text, possibly due to non-HTML content or other errors'}

def test_extract_text_from_missing_url(client):
    response = client.post('/get-text', json={})
    assert response.status_code == 400  # Assuming you adjust your code to handle this case
    assert "error" in response.json

def test_get_text_with_get_method(client):
    response = client.get('/get-text')
    assert response.status_code == 405  # Method Not Allowed


def test_extract_text_from_non_html_url(client, mock_selenium,mocker):
    mock_selenium.return_value.page_source = "Non-HTML content"
    mocker.patch('bs4.BeautifulSoup.get_text', return_value=None)
    response = client.post('/get-text', json={'url': 'https://www.clickdimensions.com/links/TestPDFfile.pdf'})
    assert response.status_code == 400
    assert response.json == {'error': 'Could not extract text, possibly due to non-HTML content or other errors'} 

def test_extract_text_response_time(client, mock_selenium, mock_bs4):
    start_time = time.time()
    response = client.post('/get-text', json={'url': 'https://cosc.brocku.ca/~bockusd/3p94/seminartopic1.htm'})
    end_time = time.time()
    assert response.status_code == 200
    assert (end_time - start_time) < 15  

