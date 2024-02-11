from openai import OpenAI
from pytube import YouTube
import os
import textExtraction
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize(text):
    try:
        # Using OpenAI's API for text summarization
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "Summarize the following text:"},
                {"role": "user", "content": text}
            ]
        )
        # Extracting the content from the response object
        summary = response.choices[0].message.content
    except Exception as e:
        summary = f"An error occurred: {str(e)}"
    return summary

def processYouTubeURL(url):
    caption = YouTube(url).captions.get_by_language_code('en')
    transcript = caption.generate_srt_captions()
    return summarize(transcript)

def processURL(url):

    extractedText = textExtraction.extract_text_from_url(url)

    print(extractedText)

    return summarize(extractedText)

def processVideo(video):
    # Placeholder for video processing logic
    # Here, you'll need to implement video processing, such as extracting the transcript
    # and summarizing it.
    return "Video processing and summarization not implemented yet."