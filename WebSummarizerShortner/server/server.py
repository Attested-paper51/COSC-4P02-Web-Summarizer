from flask import Flask, request, jsonify
from flask_cors import CORS
import sumarization as sum

app = Flask(__name__)
CORS(app)


@app.route('/api/summarize', methods=['POST'])
def summarize_text():

    # recieving data from frontend
    data = request.get_json()
    key = data.get('key') # key for front end
    input_text = data.get('input') # the input text, this contains either text, url, or youtube url (this will be summarized)
    type = data.get('type')  # the tabs, 0 for Text, 1 for Website URL, 2 for YouTube URL
    tone = data.get('tone') # tones are "Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"
    style = data.get('style') # styles are "Paragraph", "Bullet Points", "Numbered List"
    length =  data.get('length') # word length slider, values are 1, 2, 3
    option = data.get('option') # "Full Video", "Timestamp"
    cite = "APA"

    if key != 'frontend':
        return

    length_mapping = {
    1: "short",
    2: "medium",
    3: "long"
}
    length = length_mapping[length]

    print(f"tone: {tone}\nstyle: {style}\nlength: {length}\noption: {option}\ncite: {cite}\n")

    cite = f"Provide a citation in {cite} format of the given URL at the end. Have it look like:\n\nReference:\n[citation]"


    if not input_text:  # This checks for both None and empty string (""), as well as other falsy values like 0, [], etc.
        return jsonify({"error": "Missing or empty text"})

    # for Text
    elif type == 0:
        print("User pasted text:", input_text)

        error, result =  sum.summarize(input_text, tone, style, length)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # for a url
    elif type == 1:
        print("User given URL", input_text)

        error, result = sum.processURL(input_text, tone, style, length, cite)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # for a YouTube video url
    elif type == 2:
        
        print("User given YouTube URL", input_text)

        error, result = sum.processYouTubeURL(input_text, option, tone, style, length)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # error
    else:
        return jsonify({"error": "Invalid input type"})


if __name__ == "__main__":
    app.run(debug=True)