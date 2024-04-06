from openai import OpenAI
from dotenv import load_dotenv
import os
import textExtraction
import YouTubeTranscribe as ytExtract

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Summarizes text content with openai
def summarize(text, tone, style, length, cite=None):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": f"You are a powerful summarization tool. Your task is to summarize the provided text with a {tone} tone. The summary should be in {style} form. give me a {length} summary. {cite}"},
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
        return error, result
    else:
        extractedText = result + f"\n\nYouTube video: {url}"
        return summarize(extractedText, tone, style, length)
 

# extract text content from websites to then pass to openai for summary
def processURL(url, tone, style, length, cite):

    error, result = textExtraction.extract_text_from_url(url)

    if error:
        return error, result
    else:
        extractedText = result + f"\n\nWebpage url: {url}"
        return summarize(extractedText, tone, style, length, cite)

