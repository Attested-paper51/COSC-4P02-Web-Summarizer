import unittest
from Timestamp import extract_video_id  

class TestExtractVideoID(unittest.TestCase):

    def test_valid_url(self):
        url = "https://www.youtube.com/watch?v=abcdefghijk"
        self.assertEqual(extract_video_id(url), "abcdefghijk")

    def test_short_url(self):
        url = "https://youtu.be/abcdefghijk"
        self.assertEqual(extract_video_id(url), "abcdefghijk")

    def test_embedded_url(self):
        url = "https://www.youtube.com/embed/abcdefghijk"
        self.assertEqual(extract_video_id(url), "abcdefghijk")

    def test_invalid_url(self):
        url = "https://www.youtube.com/watch?v=abc"
        self.assertIsNone(extract_video_id(url))

if __name__ == '__main__':
    unittest.main()
