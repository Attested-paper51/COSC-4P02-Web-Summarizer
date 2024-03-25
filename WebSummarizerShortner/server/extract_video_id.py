from youtube_transcript_api import YouTubeTranscriptApi
import re

def extract_video_id(url):
    """
    Extracts and returns the video ID from a YouTube URL.
    If the URL is invalid or does not contain a video ID, returns None.
    """
    video_id_match = re.search(r'v=([0-9A-Za-z_-]{11})', url)
    if video_id_match:
        return video_id_match.group(1)
    else:
        return None

def main():
    # Ask the user for the YouTube video URL
    url = input("Please enter the YouTube video URL: ")
    video_id = extract_video_id(url)

    if video_id:
        try:
            # Fetch and print the transcript using the video ID
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
            for segment in transcript:
                print(segment['text'])
        except Exception as e:
            print(f"An error occurred: {e}")
    else:
        print("Invalid YouTube URL")

if __name__ == '__main__':
    main()