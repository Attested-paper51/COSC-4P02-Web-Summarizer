from openai import OpenAI
import os
import textExtraction
import youtubeSummarization as ytExtract
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize(text, extra):
    try:
        # Using OpenAI's API for text summarization
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "Summarize the following, " + extra},
                {"role": "user", "content": text}
            ]
        )
        # Extracting the content from the response object
        summary = response.choices[0].message.content
    except Exception as e:
        summary = f"An error occurred: {str(e)}"
    return summary

def processYouTubeURL(url, on, startM, startS, endM,  endS, extra):
    extractedText = ytExtract.timeStampCaptions(on, url, startM, startS, endM,  endS)

    extra = "Youtube Video, " + extra

    print(extractedText)

    return summarize(extractedText, extra)

def processURL(url, extra):
    extractedText = textExtraction.extract_text_from_url(url)

    extra = "webpage, " + extra

    print(extractedText)

    return summarize(extractedText, extra)