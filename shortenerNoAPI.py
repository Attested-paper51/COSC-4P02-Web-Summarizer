from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import shortuuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urldatabase.db'
db = SQLAlchemy(app)

class ShortenedURL(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    originalURL = db.Column(db.String(512),nullable=False)
    shortURL = db.Column(db.String(20),unique=True,nullable=False)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shorten',methods=['POST'])
def shorten():
    originalURL = request.form['originalURL']

    existingEntry = ShortenedURL.query.filter_by(originalURL = originalURL).first()
    if existingEntry:
        return redirect(existingEntry.shortURL)

    shortURL = shortuuid.ShortUUID().random(length=6)

    newEntry = ShortenedURL(originalURL=originalURL,shortURL=shortURL)
    db.session.add(newEntry)
    db.session.commit()

