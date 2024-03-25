from youtube_transcript_api import YouTubeTranscriptApi
import re

# Ask the user for the YouTube video URL
url = input("Please enter the YouTube video URL: ")

# Extract the video ID from the URL
video_id_match = re.search(r'v=([0-9A-Za-z_-]{11})', url)
if video_id_match:
    video_id = video_id_match.group(1)
    try:
        # Fetch and print the transcript using the video ID
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        for segment in transcript:
            print(segment['text'])
    except Exception as e:
        print(f"An error occurred: {e}")
else:
    print("Invalid YouTube URL")