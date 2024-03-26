from youtube_transcript_api import YouTubeTranscriptApi
import re

def videoTranscript(url):
    # Extract the video ID from the URL
    video_id_match = re.search(r'v=([0-9A-Za-z_-]{11})', url)
    if video_id_match:
        video_id = video_id_match.group(1)
        text = ""
        try:
            # Fetch and print the transcript using the video ID
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            for segment in transcript:
                text += segment['text'] + " "
            return text
        except Exception as e:
            return f"An error occurred: {e}"
    else:
        return "Invalid YouTube URL"