from flask import Flask, render_template, request
import sumarization as sum

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
            summarizedText = sum.summarize(text)
            inputProcessed = True
        # If no text input or it's empty, check for URL
        elif 'inputURL' in request.form and request.form['inputURL'].strip() and not inputProcessed:
            url = request.form.get('inputURL')
            print("User given URL", url)
            summarizedText = sum.processURL(url)
            inputProcessed = True
        # If no text or URL input or they're empty, check for video file upload
        elif 'videoUpload' in request.files and not inputProcessed:
            video = request.files['videoUpload']
            if video.filename != '':
                summarizedText = sum.processVideo(video)
            else:
                summarizedText = "No video file selected."
            inputProcessed = True

        # Rendering the template with summary
        return render_template('index.html', summary=summarizedText)

    # If not POST, or no input processed, render template with default message
    return render_template("index.html", summary=summarizedText)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
