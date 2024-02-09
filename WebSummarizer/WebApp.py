from flask import Flask, render_template, request
from openai import OpenAI
from pytube import YouTube
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handleUser():
    summarizedText = "Your summary will appear here."
    if request.method == 'POST':
        # Initialize a variable to keep track of whether an input has been processed
        inputProcessed = False

        # Check if there's text input for summarization and it's not empty
        if 'inputText' in request.form and request.form['inputText'].strip():
            text = request.form.get('inputText')
            print("User pasted text:", text)
            summarizedText = summarize(text)
            inputProcessed = True
        # If no text input or it's empty, check for URL
        elif 'inputURL' in request.form and request.form['inputURL'].strip() and not inputProcessed:
            url = request.form.get('inputURL')
            print("User given URL", url)
            summarizedText = processURL(url)
            inputProcessed = True
        # If no text or URL input or they're empty, check for video file upload
        elif 'videoUpload' in request.files and not inputProcessed:
            video = request.files['videoUpload']
            if video.filename != '':
                summarizedText = processVideo(video)
            else:
                summarizedText = "No video file selected."
            inputProcessed = True

        # Rendering the template with summary
        return render_template('index.html', summary=summarizedText)

    # If not POST, or no input processed, render template with default message
    return render_template("index.html", summary=summarizedText)

def summarize(text):
    try:
        # Using OpenAI's API for text summarization
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
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
    endpoint = "https://extractorapi.com/api/v1/extractor"
    params = {
        "apikey": os.getenv("URL_API_KEY"),
        "url": url
    }

    r = requests.get(endpoint, params=params)

    # print(r.json())
    json_response = r.json()
    extracted_text = json_response.get('text', 'Text Not Found')

    print(extracted_text)

    return summarize(extracted_text)

def processVideo(video):
    # Placeholder for video processing logic
    # Here, you'll need to implement video processing, such as extracting the transcript
    # and summarizing it.
    return "Video processing and summarization not implemented yet."

if __name__ == "__main__":
    app.run(debug=True)
