import sys
import os

# Ensure the directory two levels up is in the path to access the server module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

import unittest
import json
from server import app

class TextSummarizationTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True
        self.result_log = open('text_test_results.txt', 'a')  # Open a file in append mode

    def tearDown(self):
        self.result_log.close()  # Ensure the file is closed after the tests

    def log_response(self, test_name, request, response):
        # Log test details into the file
        self.result_log.write(f"Test Name: {test_name}\n")
        self.result_log.write("Request: " + json.dumps(request, indent=4) + "\n")
        self.result_log.write("Response: " + json.dumps(response.json, indent=4) + "\n\n")

    # Tests for invalid API key handling
    def test_invalid_key(self):
        request = {
            'key': 'wrong_key',
            'input': 'Sample text',
            'type': 0,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'medium'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['error'], "Invalid or missing api key")
        self.log_response('Invalid API Key Test', request, response)

    # Tests for empty text input to ensure proper error handling
    def test_empty_text(self):
        request = {
            'key': 'frontend',
            'input': '',
            'type': 0,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'medium'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "Missing or empty text")
        self.log_response('Empty Text Input Test', request, response)

    # Tests for invalid input type provided
    def test_invalid_input_type(self):
        request = {
            'key': 'frontend',
            'input': 'This should be treated as text, but is mislabeled.',
            'type': 7,  # Incorrect type (should be 0 for text)
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'medium'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "Invalid input type")
        self.log_response('Invalid Input Type Test', request, response)

    # Comprehensive testing across various tones, styles, and lengths
    def test_comprehensive_text_tone_style_length(self):
        combinations = [
            ('Formal', 'Bullet Points', 'short'),
            ('Casual', 'Numbered List', 'long'),
            ('Sarcastic', 'Paragraph', 'medium')
        ]
        for tone, style, length in combinations:
            with self.subTest(tone=tone, style=style, length=length):
                request = {
                    'key': 'frontend',
                    'input': 'Comprehensive testing of tone, style, and length.',
                    'type': 0,
                    'tone': tone,
                    'style': style,
                    'length': length
                }
                response = self.client.post('/api/summarize', json=request)
                self.assertEqual(response.status_code, 200)
                self.assertIn('summary', response.json)
                self.log_response(f'Test Tone: {tone}, Style: {style}, Length: {length}', request, response)

if __name__ == '__main__':
    unittest.main()
