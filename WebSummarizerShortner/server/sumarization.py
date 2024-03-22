from openai import OpenAI
import os
import textExtraction
import youtubeSummarization as ytExtract
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize(text, extra, words=500):
    try:
        response = client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {"role": "system", "content": f"You are a powerful summarization tool. Your task is to summarize the provided text in {words} words or less: {extra}"},
                {"role": "user", "content": f"\n'{text}'"}
            ]
        )
        summary = response.choices[0].message.content
        return {'summary': summary, 'error': None}
    except Exception as e:
        return {'summary': None, 'error': f"Error occurred in summarize: {str(e)}"}

def processYouTubeURL(url, on, startM, startS, endM, endS, extra):
    try:
        extractedText = ytExtract.timeStampCaptions(on, url, startM, startS, endM, endS)
        extra = " Youtube Video" + extra
        return summarize(extractedText, extra)
    except Exception as e:
        return {'summary': None, 'error': f"Error in processing YouTube URL: {str(e)}"}

def processURL(url, extra):
    try:
        extractedText = textExtraction.extract_text_from_url(url)
        extra = " webpage" + extra
        return summarize(extractedText, extra)
    except Exception as e:
        return {'summary': None, 'error': f"Error in processing URL: {str(e)}"}
