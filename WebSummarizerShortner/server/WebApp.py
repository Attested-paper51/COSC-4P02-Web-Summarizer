from flask import Flask, render_template, request, make_response
import sumarization as sum

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handleUser():
    summarizedText = "Your summary will appear here."
    extra = request.form.get('extra', 'in point form')
    if request.method == 'POST':
        # Initialize a variable to keep track of whether an input has been processed
        inputProcessed = False

        # Check if there's text input for summarization and it's not empty
        if 'inputText' in request.form and request.form['inputText'].strip():
            text = request.form.get('inputText')
            print("User pasted text:", text)
            summarizedText = sum.summarize(text, extra)
            inputProcessed = True
        # If no text input or it's empty, check for URL
        elif 'inputURL' in request.form and request.form['inputURL'].strip() and not inputProcessed:
            url = request.form.get('inputURL')
            print("User given URL", url)
            summarizedText = sum.processURL(url, extra)
            inputProcessed = True
        elif 'inputYTURL' in request.form and request.form['inputYTURL'].strip() and not inputProcessed:
            url = request.form.get('inputYTURL')

            startM = int(request.form.get('startM') or '0')
            startS = int(request.form.get('startS') or '0')
            endM = int(request.form.get('endM') or '0')
            endS = int(request.form.get('endS') or '0')

            print("User given URL", url)
            summarizedText = sum.processYouTubeURL(url, False, startM, startS, endM,  endS, extra)
            inputProcessed = True

        # Rendering the template with summary
        return render_template('index.html', summary=summarizedText, extra=extra)

    # If not POST, or no input processed, render template with default message
    return render_template("index.html", summary=summarizedText, extra=extra)

# Route to download JSON data
@app.route('/download', methods=['GET', 'POST'])
def download_json():
    if request.method == 'POST':
        summary = request.form['summary']
        data = {"text": summary}

        print(data)

        response = make_response(data)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Content-Disposition'] = 'attachment; filename=summary.json'

        return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
