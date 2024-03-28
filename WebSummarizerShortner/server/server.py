from flask import Flask, request, jsonify
from flask_cors import CORS
import sumarization as sum

app = Flask(__name__)
CORS(app)


@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    input_text = data.get('text') # the input text
    type = data.get('type')  # the tabs, 0 for Text, 1 for Website URL, 2 for YouTube URL
    tone = data.get('tone') # tones are "Standard", "Formal", "Causal", "Sarcastic", "Aggressive", "Sympathetic"
    style = data.get('style') # styles are "Paragraph", "Bullet Points", "Numbered List"
    length =  data.get('length') # word length slider
    option = data.get('option') # "Full Video", "Timestamp"

    length_mapping = {
    1: "short",
    2: "medium",
    3: "long"
}
    length = length_mapping[length]

    print(f"tone: {tone}\nstyle: {style}\nlength: {length}\noption: {option}")

    if not input_text:  # This checks for both None and empty string (""), as well as other falsy values like 0, [], etc.
        return jsonify({"error": "Missing or empty text"})

    # for Text
    elif type == 0:
    elif type == 0:
        print("User pasted text:", input_text)

        error, result =  sum.summarize(input_text, tone, style, length)

        if error:
            return jsonify({'error': result})
        else:
            return jsonify({'summary': result})
    
    # for a url
    elif type == 1:
    elif type == 1:
        print("User given URL", input_text)

        error, result = sum.processURL(input_text, tone, style, length)

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


if __name__ == '__main__':
    app.run(debug=True)
