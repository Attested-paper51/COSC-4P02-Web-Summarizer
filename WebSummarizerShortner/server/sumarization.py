from openai import OpenAI
import os
import textExtraction
import YouTubeTranscribe as ytExtract
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Summarizes text content with openai
def summarize(text, tone, style, length):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": f"You are a powerful summarization tool. Your task is to summarize the provided text with a {tone} tone in {style} form. give me a {length} summary"},
                {"role": "user", "content": text}
            ]
        )
        summary = response.choices[0].message.content
        return False, summary
    except Exception as e:
        return True, f"Error occurred in summarize: {str(e)}"

# Extract text content from youtube url to then pass to openai to summarize
def processYouTubeURL(url, option, tone, style, length, startTime=0, endTime=0):

    error, result = ytExtract.caption(url, option, startTime, endTime)

    if error:
        return error, "error processing Youtube URL: " + result
    else:
        extractedText = f"YouTube video({url}): " + result
        return summarize(extractedText, tone, style, length)
 

# extract text content from websites to then pass to openai for summary
def processURL(url, tone, style, length):

    error, result = textExtraction.extract_text_from_url(url)

    if error:
        return error, "error processing URL: " + result
    else:
        extractedText = f"Webpage ({url}): " + result
        return summarize(extractedText, tone, style, length)

