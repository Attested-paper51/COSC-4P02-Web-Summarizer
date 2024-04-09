import os
import re
import boto3
import yt_dlp
import requests
import time
import subprocess
import json
import datetime
from youtube_transcript_api import YouTubeTranscriptApi

# Set your AWS region and S3 bucket name
AWS_REGION = "ca-central-1"
S3_BUCKET_NAME = "ytaudiotranscribe"

def convert_time_to_seconds(time_str):
    """Converts time from HH:MM format to seconds."""
    parts = [int(part) for part in time_str.split(":")]
    if len(parts) == 2:  # HH:MM format
        hours, minutes = parts
        if not 0 <= minutes < 60:
            raise ValueError("Invalid minute value. Must be between 00 and 59.")
        return hours * 3600 + minutes * 60
    else:
        raise ValueError("Invalid time format. Please use HH:MM")

def validate_time_within_duration(start_seconds, end_seconds, duration_seconds):
    """Checks if start times are within the video duration and in correct order."""
    if start_seconds >= end_seconds:
        raise ValueError("Start time must be less than end time.")
    if start_seconds > duration_seconds or end_seconds > duration_seconds:
        raise ValueError("Start or end time exceeds video duration.")

def get_video_duration(video_id):
    """Fetches the video duration in seconds."""
    with yt_dlp.YoutubeDL({}) as ydl:
        info = ydl.extract_info(video_id, download=False)
        return info['duration']

def upload_file_to_s3(file_name, bucket=S3_BUCKET_NAME, object_name=None):
    if object_name is None:
        object_name = file_name
    s3_client = boto3.client('s3', region_name=AWS_REGION)
    try:
        start_time = time.time()  # Start time for upload measurement
        s3_client.upload_file(file_name, bucket, object_name)
        upload_time = time.time() - start_time
        print(f"Upload successful. Upload time: {upload_time:.2f} seconds")
    except boto3.exceptions.S3UploadFailedError as e:
        print(f"Upload failed: {e}")
        return False
    return True

def download_audio(video_url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': '%(id)s.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
        info = ydl.extract_info(video_url, download=False)
        return f"{info['id']}.mp3"

def transcribe_audio(file_path, bucket=S3_BUCKET_NAME):
    transcribe_client = boto3.client('transcribe', region_name=AWS_REGION)
    job_name = os.path.basename(file_path).replace('.', '-') + str(int(time.time()))
    job_uri = f"s3://{bucket}/{file_path}"

    transcribe_client.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': job_uri},
        MediaFormat='mp3',
        LanguageCode='en-US',
    )

    while True:
        status = transcribe_client.get_transcription_job(TranscriptionJobName=job_name)
        if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
            break
        time.sleep(5)

    if status['TranscriptionJob']['TranscriptionJobStatus'] == 'COMPLETED':
        
        transcript_file_uri = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
        transcript_response = requests.get(transcript_file_uri)
        transcript = transcript_response.json()
        return transcript['results']['transcripts'][0]['transcript']
    else:
        return None

def extract_part_from_transcript(transcript_json, start_seconds, end_seconds):
    transcript_data = json.loads(transcript_json)
    segments = transcript_data['results']['items']

    relevant_texts = []
    for segment in segments:
        if segment.get('type') == 'pronunciation':
            start_time = float(segment['start_time'])
            end_time = float(segment['end_time'])
            if start_seconds <= start_time <= end_seconds:
                relevant_texts.append(segment['alternatives'][0]['content'])
            elif start_time > end_seconds:
                break

    return ' '.join(relevant_texts)

def trim_audio(input_file, start_time, end_time, output_file):
    start_time_str = str(datetime.timedelta(seconds=start_time))
    end_time_str = str(datetime.timedelta(seconds=end_time))
    subprocess.call(['ffmpeg', '-i', input_file, '-ss', start_time_str, '-to', end_time_str, '-acodec', 'copy', output_file])

def caption(video_url, transcribe_option, start_time_str, end_time_str):

    video_id_match = re.search(r'v=([0-9A-Za-z_-]{11})', video_url)
    
    final_transcript = None  # Initialize the variable to store the final transcript
    
    if video_id_match:
        video_id = video_id_match.group(1)
        video_duration = get_video_duration(video_id)  # Fetch video duration for validation
        
        start_seconds = None
        end_seconds = None

        if transcribe_option == 'Timestamp':
            try:
                start_seconds = convert_time_to_seconds(start_time_str)
                end_seconds = convert_time_to_seconds(end_time_str)

                validate_time_within_duration(start_seconds, end_seconds, video_duration)
            except ValueError as e:
                return True, str(e)

        original_audio_file = None  # Initialize the variable to store the downloaded audio file

        # Attempt to fetch an existing transcript, fallback to audio download if necessary
        try:
            if transcribe_option == 'Full Video':
                transcript = YouTubeTranscriptApi.get_transcript(video_id)
                final_transcript = " ".join(segment['text'] for segment in transcript)
                return False, final_transcript
            elif transcribe_option == 'Timestamp':
                transcript = YouTubeTranscriptApi.get_transcript(video_id)
                final_transcript = " ".join(segment['text'] for segment in transcript if start_seconds <= segment['start'] <= end_seconds)
                return False, final_transcript
        except Exception as e:
            print(f"Captions not available or failed to fetch due to {e}, downloading audio...")
            original_audio_file = download_audio(video_url)

        if original_audio_file:
            file_to_upload = None

            if transcribe_option == 'Timestamp' and start_seconds is not None and end_seconds is not None:
                trimmed_audio_file = f"trimmed_{original_audio_file}"
                trim_audio(original_audio_file, start_seconds, end_seconds, trimmed_audio_file)
                file_to_upload = trimmed_audio_file
            else:
                file_to_upload = original_audio_file

            if file_to_upload and upload_file_to_s3(file_to_upload):
                final_transcript = transcribe_audio(file_to_upload)  # Obtain the transcript from the uploaded audio
                if final_transcript is None:
                    print("Transcription failed.")
                os.remove(file_to_upload)  # Clean up the uploaded file
                return False, final_transcript
            else:
                return True, "Failed to upload audio to S3."
            

        # Clean up original downloaded audio if it exists and is different from the file uploaded
        if original_audio_file and file_to_upload != original_audio_file:
            os.remove(original_audio_file)
        # Clean up original downloaded audio if it exists and is different from the file uploaded
        if original_audio_file and file_to_upload != original_audio_file:
            os.remove(original_audio_file)
    else:
        return True, "Invalid YouTube URL"
    
    # At this point, `final_transcript` will either contain the transcript text, or None if transcription failed.
    # This is where you would typically pass `final_transcript` to the next part of your processing pipeline.
    if final_transcript:
        print("Transcription is ready for further processing.")
    else:
        print("No transcription available.")