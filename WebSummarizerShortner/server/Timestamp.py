from youtube_transcript_api import YouTubeTranscriptApi
import re

def extract_video_id(url):
    video_id_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})', url)
    if video_id_match:
        return video_id_match.group(1)
    return None

def get_transcript_for_time_range(video_id, start_minutes, start_seconds, end_minutes, end_seconds):
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    # Convert minutes to seconds for easier comparison
    start_time = start_minutes * 60 + start_seconds
    end_time = end_minutes * 60 + end_seconds
    # Filter the transcript to only include segments within the specified time range
    filtered_transcript = [segment for segment in transcript if start_time <= segment['start'] <= end_time]
    return " ".join(segment['text'] for segment in filtered_transcript)

def get_time_input(prompt):
    while True:
        time_str = input(prompt)
        try:
            minutes, seconds = map(int, time_str.split(':'))
            if 0 <= minutes and 0 <= seconds < 60:
                return minutes, seconds
            else:
                print("Please enter a valid time in the format MM:SS.")
        except ValueError:
            print("Please enter a valid time in the format MM:SS.")

def main():
    url = input("Please enter the YouTube video URL: ")
    video_id = extract_video_id(url)
    if video_id:
        start_minutes, start_seconds = get_time_input("Enter the start time (MM:SS): ")
        end_minutes, end_seconds = get_time_input("Enter the end time (MM:SS): ")
        if (end_minutes * 60 + end_seconds) <= (start_minutes * 60 + start_seconds):
            print("End time must be greater than start time.")
            return
        try:
            filtered_transcript = get_transcript_for_time_range(video_id, start_minutes, start_seconds, end_minutes, end_seconds)
            print("Filtered Transcript:")
            print(filtered_transcript)
        except Exception as e:
            print(f"An error occurred: {e}")
    else:
        print("Invalid YouTube URL")

if __name__ == '__main__':
    main()
