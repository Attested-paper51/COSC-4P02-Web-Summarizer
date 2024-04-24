
import sys
import os
import unittest
import json

# Ensure the parent directory is in the path to access the server module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from server import app

class YouTubeSummarizationTestCase(unittest.TestCase):
    def setUp(self):
        # Set up client for testing with test client from Flask app
        self.client = app.test_client()
        self.client.testing = True
        # Open a file in append mode for logging the results of each test
        self.result_log = open('youtube_test_results.txt', 'a')

    def tearDown(self):
        # Ensure the file is closed after the tests
        self.result_log.close()

    def log_response(self, test_name, request, response):
        # Log test details into the file for review, including request and response
        self.result_log.write(f"Test Name: {test_name}\n")
        self.result_log.write("Request: " + json.dumps(request, indent=4) + "\n")
        self.result_log.write("Response: " + json.dumps(response.json, indent=4) + "\n\n")

    def test_full_video(self):
        # Test for summarizing the full video without timestamp specifications
        request = {
            'key': 'frontend',
            'input': 'https://www.youtube.com/watch?v=UNP03fDSj1U',
            'type': 2,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short',
            'option': 'Full Video'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)
        self.log_response('Full Video Test', request, response)

    def test_invalid_url(self):
        # Test for summarizing with an invalid YouTube URL
        request = {
            'key': 'frontend',
            'input': 'https://www.youtube.com/watch?v=invalid_video',
            'type': 2,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short',
            'option': 'Full Video'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "Invalid YouTube URL")
        self.log_response('Invalid URL Test', request, response)

    def test_timestamps(self):
        # Test for summarizing a video with valid timestamps
        request = {
            'key': 'frontend',
            'input': 'https://www.youtube.com/watch?v=UNP03fDSj1U',
            'type': 2,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short',
            'option': 'Timestamp',
            'startTime': '00:01',
            'endTime': '00:03'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)
        self.log_response('Valid Timestamps Test', request, response)

    def test_timestamp_errors(self):
        # Test for summarizing a video with invalid timestamps
        request = {
            'key': 'frontend',
            'input': 'https://www.youtube.com/watch?v=UNP03fDSj1U',
            'type': 2,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short',
            'option': 'Timestamp',
            'startTime': 'invalid_start_time',
            'endTime': 'invalid_end_time'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "Invalid time format. Please use HH:MM")
        self.log_response('Invalid Timestamp Test', request, response)

    def test_timestamp_errors(self):
        # Test for summarizing a video with invalid timestamps
        request = {
            'key': 'frontend',
            'input': 'https://www.youtube.com/watch?v=UNP03fDSj1U',
            'type': 2,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short',
            'option': 'Timestamp',
            'startTime': '00:03',
            'endTime': '00:01'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "Start time must be less than end time.")
        self.log_response('Invalid Start Time or End Time Test', request, response)

    def test_timestamp_errors(self):
        # Test for summarizing a video with invalid timestamps
        request = {
            'key': 'frontend',
            'input': 'https://www.youtube.com/watch?v=UNP03fDSj1U',
            'type': 2,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 'short',
            'option': 'Timestamp',
            'startTime': '00:00',
            'endTime': '00:05'
        }
        response = self.client.post('/api/summarize', json=request)
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)
        self.assertEqual(response.json['error'], "Start or end time exceeds video duration.")
        self.log_response('Exceed Video Duration Test', request, response)

if __name__ == '__main__':
    unittest.main()
