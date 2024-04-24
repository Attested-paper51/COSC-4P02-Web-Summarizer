
import sys
import os
import unittest
import json

# Ensure the directory two levels up is in the path to access the server module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from server import app

class WebsiteURLSummarizationTestCase(unittest.TestCase):
    def setUp(self):
        # Setup client for testing
        self.client = app.test_client()
        self.client.testing = True
        self.result_log = open('website_test_results.txt', 'a')  # Open a file in append mode for logging

    def tearDown(self):
        # Clean up and close the log file
        self.result_log.close()

    def log_response(self, test_name, request, response):
        # Log test details into the file for review
        self.result_log.write(f"Test Name: {test_name}\n")
        self.result_log.write("Request: " + json.dumps(request, indent=4) + "\n")
        self.result_log.write("Response: " + json.dumps(response.json, indent=4) + "\n\n")

    def test_valid_url_with_citations(self):
        # Test summarization of a valid URL with different citation styles
        citations = ["No Citation", 'APA', 'MLA', 'Chicago']
        for cite in citations:
            with self.subTest(citation=cite):
                request = {
                    'key': 'frontend',
                    'input': 'https://en.wikipedia.org/wiki/Main_Page',
                    'type': 1,
                    'tone': 'Standard',
                    'style': 'Paragraph',
                    'length': 'short',
                    'citation': cite
                }
                response = self.client.post('/api/summarize', json=request)
                self.assertEqual(response.status_code, 200)
                self.assertIn('summary', response.json)
                self.log_response(f'Valid URL with {cite} Citation', request, response)

    def test_invalid_url(self):
        # Test behavior when an invalid URL is provided
        request = {
            'key': 'frontend',
            'input': 'https://thisisdefinitelynotavalidurl.com',
            'type': 1,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "error processing url (please use html urls)")
        self.log_response('Invalid URL Test', request, response)

if __name__ == '__main__':
    unittest.main()
