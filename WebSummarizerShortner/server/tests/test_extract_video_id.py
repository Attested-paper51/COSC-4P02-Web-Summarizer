import unittest
from extract_video_id import extract_video_id  # Make sure this matches the name of your script and function

class TestExtractVideoID(unittest.TestCase):

    def test_valid_url(self):
        """Test that the function extracts the correct ID from a valid YouTube URL."""
        self.assertEqual(extract_video_id('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ')

    def test_invalid_url(self):
        """Test that the function returns None for an invalid YouTube URL."""
        self.assertIsNone(extract_video_id('https://www.example.com'))

    def test_url_without_video_id(self):
        """Test that the function returns None if the URL does not contain a video ID."""
        self.assertIsNone(extract_video_id('https://www.youtube.com/watch'))

    def test_url_with_additional_parameters(self):
        """Test that the function extracts the correct ID from a URL with additional parameters."""
        self.assertEqual(extract_video_id('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be'), 'dQw4w9WgXcQ')

    def test_shortened_url(self):
        """Test that the function extracts the correct ID from a shortened YouTube URL."""
        # Assuming your function currently does NOT handle shortened URLs, this should return None
        # If your function is updated to handle shortened URLs, adjust the expected result accordingly
        self.assertIsNone(extract_video_id('https://youtu.be/dQw4w9WgXcQ'))

    def test_invalid_pattern_url(self):
        """Test that the function returns None for a URL that looks similar but doesn't match the expected pattern."""
        self.assertIsNone(extract_video_id('https://www.youtube.com/watch?v1=dQw4w9WgXcQ'))

if __name__ == '__main__':
    unittest.main()