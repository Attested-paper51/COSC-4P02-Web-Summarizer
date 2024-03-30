import unittest
import json
from server import app

class SummarizeAPITestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_empty_text(self):
        response = self.client.post('/api/summarize', json={
            'text': '',
            'type': 0,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 1,
            'option': 'Full Video'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('error', response.json)

    def test_valid_text_summarization(self):
        response = self.client.post('/api/summarize', json={
            'text': 'Sample text for summarization',
            'type': 0,
            'tone': 'Standard',
            'style': 'Paragraph',
            'length': 1,
            'option': 'Full Video'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)

    def test_valid_url_summarization(self):
        response = self.client.post('/api/summarize', json={
            'text': 'https://en.wikipedia.org/wiki/Inner_Harbor',
            'type': 1,
            'tone': 'Formal',
            'style': 'Bullet Points',
            'length': 2,
            'option': 'Full Video'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)

    def test_valid_youtube_summarization(self):
        response = self.client.post('/api/summarize', json={
            'text': 'https://www.youtube.com/watch?v=NHopJHSlVo4',
            'type': 2,
            'tone': 'Causal',
            'style': 'Numbered List',
            'length': 3,
            'option': 'Full Video'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('summary', response.json)

    # Additional tests can be added for different combinations of tone, style, and length
    # to ensure that each pathway in your API is functioning as expected.

if __name__ == '__main__':
    unittest.main()
