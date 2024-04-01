from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import shortuuid
import os

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urldatabase.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/database4p02'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app,db)#So that changes can be migrated to the database automatically


#Defining the ShortenedURL class in the same fashion as the database
class ShortenedURL(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    original_url = db.Column(db.String(512),nullable=False)
    short_url = db.Column(db.String(20),unique=True,nullable=False)
    click_count = db.Column(db.Integer,default=0)


#Render the index.html landing page
@app.route('/')
def index():
    return render_template('index.html')

#Renders new page with the link information
@app.route('/shorten',methods=['POST'])
def shorten():
    originalURL = request.form['originalURL']

    existingEntry = ShortenedURL.query.filter_by(original_url = originalURL).first()
    
    if existingEntry:
        return render_template('result.html',
            originalURL=existingEntry.original_url,
            shortURL = request.url_root+existingEntry.short_url,
            clickCount = existingEntry.click_count)

    shortURL = shortuuid.ShortUUID().random(length=6)

    newEntry = ShortenedURL(original_url=originalURL,short_url=shortURL)
    db.session.add(newEntry)
    db.session.commit()

    with app.app_context():
        migrate.init_app(app, db)
        #migrate.migrate()
        #migrate.upgrade()

    return render_template('result.html',
            originalURL=newEntry.original_url,
            shortURL = request.url_root+newEntry.short_url,
            clickCount = newEntry.click_count)


#Does not work yet, can generate a link but naturally, it doesn't go anywhere.
def constructShortenedURL(shortURL):
    customRoot = 'https://shortify/'
    return f'{customRoot.rstrip("/")}/{shortURL}'

@app.route('/<shortURL>')
def redirectToOriginal(shortURL):
    entry = ShortenedURL.query.filter_by(short_url=shortURL).first_or_404()

    entry.click_count+=1
    db.session.commit()

    return redirect(entry.original_url)


with app.app_context():
    #databaseFilePath = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
    #if not os.path.exists(databaseFilePath):
    db.create_all()

if __name__ == '__main__':
    
    app.run(debug=True)
