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



