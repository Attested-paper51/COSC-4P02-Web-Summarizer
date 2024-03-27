from flask import Flask, request, jsonify
from flask_cors import CORS
import sumarization as sum
#
app = Flask(__name__)
CORS(app)

@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    input_text = data.get('text') # the input text
    type = data.get('type')  # the tabs, 0 for Text, 1 for Website URL, 2 for YouTube URL
    tone = data.get('tone') # tones are "Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"
    style = data.get('style') # styles are "Paragraph", "Bullet Points", "Numbered List"
    length =  "short" #data.get('length') # word length slider
    option = data.get('option') # "Full Video", "Timestamp"

    print(f"tone: {tone}\nstyle: {style}\nlength: {length}")

    if not input_text:  # This checks for both None and empty string (""), as well as other falsy values like 0, [], etc.
        return jsonify({"error": "Missing or empty text"}), 400

    # for Text
    elif type == 0:
        print("User pasted text:", input_text)
        summarizedText = sum.summarize(input_text, tone, style, length)

        return jsonify({'input': input_text, 'summary': summarizedText['summary']})
    
    # for a url
    elif type == 1:
        print("User given URL", input_text)
        summarizedText = sum.processURL(input_text)

        return jsonify({'input': input_text, 'summary': summarizedText['summary']})
    
    # for a YouTube video url
    elif type == 2:
        if option == "Full Video":


        elif option == "Timestamp":

            startM = 0
            startS = 0
            endM = 0
            endS = 0

            print("User given YouTube URL", input_text)
            summarizedText = sum.processYouTubeURL(input_text, False, startM, startS, endM,  endS, "in point form")

            return jsonify({'input': input_text, 'summary': summarizedText['summary']})
        else:
            return jsonify({"error": "Invalid option type"}), 400
    
    # error
    else:
        return jsonify({"error": "Invalid input type"}), 400


if __name__ == '__main__':
    app.run(debug=True)
