from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import shortuuid
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urldatabase.db'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:password@localhost/postsql_urldb.db'
db = SQLAlchemy(app)

class ShortenedURL(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    originalURL = db.Column(db.String(512),nullable=False)
    shortURL = db.Column(db.String(20),unique=True,nullable=False)
    clickCount = db.Column(db.Integer,default=0)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shorten',methods=['POST'])
def shorten():
    originalURL = request.form['originalURL']

    existingEntry = ShortenedURL.query.filter_by(originalURL = originalURL).first()
    if existingEntry:
        return render_template('result.html',
            originalURL=existingEntry.originalURL,
            shortURL = request.url_root+existingEntry.shortURL,
            clickCount = existingEntry.clickCount)

    shortURL = shortuuid.ShortUUID().random(length=6)

    newEntry = ShortenedURL(originalURL=originalURL,shortURL=shortURL)
    db.session.add(newEntry)
    db.session.commit()

    return render_template('result.html',
            originalURL=newEntry.originalURL,
            shortURL = request.url_root+newEntry.shortURL,
            clickCount = newEntry.clickCount)


#Does not work yet, can generate a link but naturally, it doesn't go anywhere.
def constructShortenedURL(shortURL):
    customRoot = 'https://shortify/'
    return f'{customRoot.rstrip("/")}/{shortURL}'

@app.route('/<shortURL>')
def redirectToOriginal(shortURL):
    entry = ShortenedURL.query.filter_by(shortURL=shortURL).first_or_404()

    entry.clickCount+=1
    db.session.commit()

    return redirect(entry.originalURL)


with app.app_context():
    #databaseFilePath = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
    #if not os.path.exists(databaseFilePath):
    db.create_all()

if __name__ == '__main__':
    
    app.run(debug=True)
