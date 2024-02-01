from openai import OpenAI
from dotenv import load_dotenv
import os
from flask import Flask, render_template, request

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def summarize():
    if request.method == 'POST':
        userText = request.form.get('inputText')

        try:
            # Adjust this part to use the chat completions endpoint
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "system", "content": "Summarize the following text:"},
                          {"role": "user", "content": userText}]
            )
            print(response)
            summary = response.choices[0].message.content

        except Exception as e:
            summary = f"An error occurred: {str(e)}"

        return render_template('index.html', summary=summary)

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
