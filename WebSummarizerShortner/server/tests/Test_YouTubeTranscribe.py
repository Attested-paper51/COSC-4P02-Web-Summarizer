import pytest
import boto3
from YouTubeTranscribe import convert_time_to_seconds, validate_time_within_duration, download_audio, transcribe_audio, upload_file_to_s3

AWS_REGION = "ca-central-1"

# Tests for convert_time_to_seconds
@pytest.mark.parametrize("time_str, expected_seconds", [
    ("02:30", 9000),  # 2 hours and 30 minutes
    ("00:45", 2700),  # 45 minutes
    ("01:00", 3600),  # 1 hour
    ("24:00", 86400), # 24 hours
    ("30:00", 108000) # 30 hours
])
def test_convert_time_to_seconds_valid(time_str, expected_seconds):
    assert convert_time_to_seconds(time_str) == expected_seconds

@pytest.mark.parametrize("invalid_time_str", [
    "100",       # Invalid format
    "one:two",   # Non-numeric
    "13:61",     # Invalid minutes
    "00:-1",     # Negative minutes
])
def test_convert_time_to_seconds_invalid(invalid_time_str):
    with pytest.raises(ValueError):
        convert_time_to_seconds(invalid_time_str)

# Tests for validate_time_within_duration
def test_validate_time_within_duration_valid():
    # Start time and end time within duration and in correct order
    validate_time_within_duration(100, 200, 300)  # Should not raise an exception

@pytest.mark.parametrize("start_seconds, end_seconds, duration_seconds", [
    (200, 100, 300),  # End before start
    (400, 500, 300),  # Start exceeds duration
    (0, 400, 300),    # End exceeds duration
])
def test_validate_time_within_duration_invalid(start_seconds, end_seconds, duration_seconds):
    with pytest.raises(ValueError):
        validate_time_within_duration(start_seconds, end_seconds, duration_seconds)

# Inside your test_youtubetranscribe.py

def test_download_audio(mocker):
    mocked_ydl = mocker.patch('yt_dlp.YoutubeDL')
    mocked_ydl.return_value.__enter__.return_value.extract_info.return_value = {'id': 'test_video', 'ext': 'mp3'}

    expected_file_name = "test_video.mp3"
    assert download_audio("dummy_url") == expected_file_name
    mocked_ydl.assert_called_once()  # Assert that yt_dlp.YoutubeDL was called

def test_transcribe_audio_completed(mocker):
    mocker.patch('boto3.client')  # Mock the entire boto3 client used in the function
    mock_transcribe_client = boto3.client('transcribe', region_name=AWS_REGION)
    mock_transcribe_client.start_transcription_job.return_value = {'TranscriptionJob': {'TranscriptionJobStatus': 'IN_PROGRESS'}}
    mock_transcribe_client.get_transcription_job.side_effect = [
        {'TranscriptionJob': {'TranscriptionJobStatus': 'IN_PROGRESS'}},
        {'TranscriptionJob': {'TranscriptionJobStatus': 'COMPLETED', 'Transcript': {'TranscriptFileUri': 'dummy_uri'}}}
    ]
    mocker.patch('requests.get').return_value.json.return_value = {
        'results': {'transcripts': [{'transcript': 'test transcript'}]}
    }

    assert transcribe_audio("test_file.mp3") == 'test transcript'

def test_upload_file_to_s3_success(mocker):
    mocked_s3_client = mocker.patch('boto3.client')
    mocked_s3_client.return_value.upload_file.return_value = None  # Assume success doesn't return anything

    assert upload_file_to_s3("test_file.mp3") == True

def test_upload_file_to_s3_failure(mocker):
    mocked_s3_client = mocker.patch('boto3.client')
    mocked_s3_client.return_value.upload_file.side_effect = boto3.exceptions.S3UploadFailedError

    assert upload_file_to_s3("test_file.mp3") == False
