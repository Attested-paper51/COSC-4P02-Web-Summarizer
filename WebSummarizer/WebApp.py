from flask import Flask, render_template, request
from openai import OpenAI
from pytube import YouTube
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def handleUser():
    summarizedText = "Please submit text or upload a video for summarization."
    if request.method == 'POST':
        # Check if there's text input for summarization
        if 'inputText' in request.form:
            text = request.form.get('inputText')
            summarizedText = summarize(text)
        elif 'inputURL' in request.form:
            text = request.form.get('inputURL')
            summarizedText = processURL(text)
            print(summarizedText)
        # Check if a video file was uploaded
        elif 'videoUpload' in request.files:
            video = request.files['videoUpload']
            if video.filename != '':
                summarizedText = processVideo(video)
            else:
                summarizedText = "No video file selected."
        # Rendering the template with summary
        return render_template('index.html', summary=summarizedText)

    return render_template("index.html")

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

def processURL(url):
    caption = YouTube(url).captions.get_by_language_code('en')
    transcript = caption.generate_srt_captions()
    return summarize(transcript)

def processVideo(video):
    # Placeholder for video processing logic
    # Here, you'll need to implement video processing, such as extracting the transcript
    # and summarizing it.
    return "Video processing and summarization not implemented yet."

if __name__ == "__main__":
    app.run(debug=True)
