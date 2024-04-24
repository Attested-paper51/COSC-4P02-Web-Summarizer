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
            model="gpt-4-turbo",
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
        extractedText = "YouTube Video Transcript: " + result
        print(extractedText)
        return summarize(extractedText, tone, style, length)
 

# extract text content from websites to then pass to openai for summary
def processURL(url, tone, style, length, cite=None):

    error, result = textExtraction.extract_text_from_url(url)

    if error:
        return error, result
    else:
        if cite == 'APA':
            cite = f"After the summary, add a citation on a new line using APA style, with in-text citations where appropriate. Use the term 'Reference' for the citation. Ensure the citation is accurately formatted according to APA guidelines. The URL to be cited is {url}."
        elif cite == 'MLA':
            cite = f"After the summary, add a citation on a new line using MLA style, with in-text citations where appropriate. Use the term 'Citation' for the citation. Ensure the citation is accurately formatted according to MLA guidelines. The URL to be cited is {url}."
        elif cite == 'Chicago':
            cite = f"After the summary, add a citation on a new line using Chicago style with footnotes where appropriate. Use the term 'Bibliography' for the citation. Ensure the citation is accurately formatted according to Chicago style guidelines. The URL to be cited is {url}."

        extractedText = "URL content: " + result
        return summarize(extractedText, tone, style, length, cite)

