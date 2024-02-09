import shortenerNoAPI as shortener

import unittest
#from flask_testing import TestCase

from shortenerNoAPI import app,db,ShortenedURL

class TestShortenURL():

    #not done
    def create_app(self):
        app.config['TESTING'] = True


    def test_index_route(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code,200)

    def test_shorten_route(self):
        response = self.client.post('/shorten',data = {'originalURL':'https://medium.com/muthoni-wanyoike/implementing-text-summarization-using-openais-gpt-3-api-dcd6be4f6933'})
        self.assertEqual(response.status.code, 200)
        self.assertIn(b'Original URL:',response.data)
        


