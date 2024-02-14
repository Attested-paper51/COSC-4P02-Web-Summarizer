import requests
import openai
from dotenv import load_dotenv
import os

from flask import Flask, render_template

app = Flask(__name__)

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")
def index():
    return render_template("index.html")


app.run()
