from flask import Flask, request, jsonify
from flask_cors import CORS
import sumarization as sum

app = Flask(__name__)
CORS(app)

@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    input_text = data.get('text')
    input_type = data.get('type')  # 0 for Text, 1 for Website URL, 2 for YouTube URL

    if input_type is None or input_text is None:
        return jsonify({"error": "Missing text or type"}), 400

    # for Text
    if input_type == 0:
        print("User pasted text:", input_text)
        summarizedText = sum.summarize(input_text, "")

        return jsonify({'input text': input_text, 'summary': summarizedText})
    elif input_type == 1:
        print("User given URL", input_text)
        summarizedText = sum.processURL(input_text, "")

        return jsonify({'input URL': input_text, 'summary': summarizedText})
    elif input_type == 2:
        startM = 0
        startS = 0
        endM = 0
        endS = 0

        print("User given YouTube URL", input_text)
        summarizedText = sum.processYouTubeURL(input_text, False, startM, startS, endM,  endS, "")

        return jsonify({'input YouTube URL': input_text, 'summary': summarizedText})
    else:
        return jsonify({"error": "Invalid input type"}), 400


if __name__ == '__main__':
    app.run(debug=True)
