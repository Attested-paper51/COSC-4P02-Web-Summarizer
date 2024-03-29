from openai import OpenAI
import os
import textExtraction
import youtubeSummarization as ytExtract
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize(text, tone, style, length):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": f"You are a powerful summarization tool. Your task is to summarize the provided text with a {tone} tone in {style} form. give me a summary {length} in size"},
                {"role": "user", "content": text}
            ]
        )
        summary = response.choices[0].message.content
        return {'summary': summary, 'error': None}
    except Exception as e:
        return {'summary': None, 'error': f"Error occurred in summarize: {str(e)}"}

def processYouTubeURL(url, on, startM, startS, endM, endS, tone, style, length):
    try:
        extractedText = f"YouTube video({url}): " + ytExtract.timeStampCaptions(on, url, startM, startS, endM, endS)
        return summarize(extractedText, tone, style, length)
    except Exception as e:
        return {'summary': None, 'error': f"Error in processing YouTube URL: {str(e)}"}

def processURL(url, tone, style, length):
    try:
        extractedText = f"Webpage ({url}): " + textExtraction.extract_text_from_url(url)
        return summarize(extractedText, tone, style, length)
    except Exception as e:
        return {'summary': None, 'error': f"Error in processing URL: {str(e)}"}
