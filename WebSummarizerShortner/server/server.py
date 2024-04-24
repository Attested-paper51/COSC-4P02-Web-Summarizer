from flask import Flask, request, jsonify
from flask_cors import CORS
import sumarization as sum
from authentication import Authentication

app = Flask(__name__)
CORS(app)

# maps cite inputs for summarization
cite_mapping = {
    None : None,
    "No Citation": None,
    "MLA Citation": "MLA",
    "APA Citation": "APA",
    "Chicago Citation" : "Chicago"
    }

# the main function for all sumarization, text, website and youtube videos
@app.route('/api/summarize', methods=['POST'])
def summarize_text():

    aut = Authentication()

    # recieving data from frontend or api
    data = request.get_json()
    key = data.get('key') # key for front end or api
    input = data.get('input') # the input text, this contains either text, url, or youtube url (this will be summarized)
    type = data.get('type')  # the tabs, 0 for Text, 1 for Website URL, 2 for YouTube URL
    tone = data.get('tone') # tones are "Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"
    style = data.get('style') # styles are "Paragraph", "Bullet Points", "Numbered List"
    length =  data.get('length') # word length slider, values are 1, 2, 3
    option = data.get('option') # "Full Video", "Timestamp"
    cite = data.get('citation') # citations are 'none', 'apa', or 'mla'
    startTime = data.get('startTime') # the start time of youtube videos, should be in format HH:MM
    endTime = data.get('endTime') # the end time of youtube videos, should be in format HH:MM

    # checks if frontend or correct api key is given
    if key != 'frontend' and not aut.checkAPIKey(key):
        return jsonify({"error": "Invalid or missing api key"})

    cite = cite_mapping.get(cite, cite)

    print(f"tone: {tone}\nstyle: {style}\nlength: {length}\nstartTime: {startTime}\nendTime: {endTime}\noption: {option}\ncite: {cite}\n")


    if not input:  # This checks for both None and empty string (""), as well as other falsy values like 0, [], etc.
        return jsonify({"error": "Missing or empty text"})

    # for Text summarization - type 0
    elif type == 0:
        print("User pasted text:", input)

        error, result =  sum.summarize(input, tone, style, length)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # for a url summarization - type 1
    elif type == 1:
        print("User given URL", input)

        error, result = sum.processURL(input, tone, style, length, cite)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # for a YouTube video url summarization - type 2
    elif type == 2:
        
        print("User given YouTube URL", input)

        error, result = sum.processYouTubeURL(input, option, tone, style, length, startTime, endTime)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # error if wrong type is given
    else:
        return jsonify({"error": "Invalid input type"})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
    #app.run(host='0.0.0.0',port=5000) #For server use only