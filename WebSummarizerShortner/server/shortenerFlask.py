import hashlib
import psycopg2
import time
from psycopg2 import sql
from urllib.parse import urlparse, unquote
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
import os
import re
from dotenv import load_dotenv
from authentication import Authentication


appS = Flask(__name__)
CORS(appS)

#SimpleURLShortener handles all the database logic for URL shortening. 
class SimpleURLShortener:

    #Constructor; connect to the database hosted on ElephantSQL
    def __init__(self):
        load_dotenv()
        databasePW = os.getenv("DATABASE_PW")
        self.conn = psycopg2.connect(
            database="encvegpm",
            user="encvegpm",
            password=databasePW,
            host="drona.db.elephantsql.com",
            port="5432",
            sslmode="require"
        )  

    #Generate a random shortened URL given an input original URL
    def shorten_url(self, originalURL,email):
        # Generate a hash for the original URL
        #Applying a unique identifier so that the hash is different even if the same URL is inputted twice
        uniqueIdentifier = str(int(time.time()))
        modURL = originalURL+uniqueIdentifier
        url_hash = hashlib.md5(modURL.encode()).hexdigest()[:6]

        # Create a link with the domain and the hash to the end
        #shortURL = "http://4p02shortify.com/s/"+url_hash[:6] #For server use only
        shortURL = "http://127.0.0.1:5002/s/"+url_hash[:6]
        

        #Resolve the user ID associated with the email, if exists
        if (email == None):
            # Store the mapping in the database
            cursor = self.conn.cursor()
            insert_query = sql.SQL("INSERT INTO shortened_url (short_url, original_url, click_count) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING")
            cursor.execute(insert_query, (shortURL, originalURL, 0,))
            self.conn.commit()
        else:
            cursor = self.conn.cursor()
            cursor.execute("SELECT username FROM users WHERE email = %s",(email,))
            user = cursor.fetchone()
            insert_query = sql.SQL("INSERT INTO shortened_url (short_url, original_url, click_count,user_id) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING")
            cursor.execute(insert_query, (shortURL, originalURL, 0, user))
            self.conn.commit()
            

        

        # Return the shortened URL
        return shortURL

    #Method to allow users to enter a custom short URL
    def customShorten_url(self,email,originalURL,customString):
        cursor = self.conn.cursor()
        cursor.execute("SELECT username FROM users WHERE email = %s",(email,))
        username = cursor.fetchone()[0]
        encodedCustomString = customString.replace('/','%2F')

        #shortURL = f"http://127.0.0.1:5002/{username}-{customString}" #Delete

        #shortURL = f"http://4p02shortify.com/s/{username}/{encodedCustomString}" #For server use only
        shortURL = f"http://127.0.0.1:5002/s/{username}/{encodedCustomString}"
        


        #check if the custom string is already in the database
        cursor.execute('SELECT id FROM shortened_url WHERE short_url = %s', (shortURL,))
        result = cursor.fetchone()
        if result:
            return -1

       #Otherwise, add the shortened URL to the database
        insert_query = sql.SQL("INSERT INTO shortened_url (short_url, original_url, click_count,user_id) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING")
        cursor.execute(insert_query, (shortURL, originalURL, 0, username))
        self.conn.commit()

        return shortURL

    #Get the click count of a given short URL
    def getClickCount(self,shortURL):
        cursor = self.conn.cursor()
        cursor.execute('SELECT click_count FROM shortened_url WHERE short_url = %s',(shortURL,))
        count = cursor.fetchone()
        if count is None:
            return -1
        return count[0]

    #Resolving a short URL - return the original from the DB
    def resolve_url(self, shortURL):
        # Retrieve the original URL from the database
        cursor = self.conn.cursor()
        cursor.execute('SELECT original_url FROM shortened_url WHERE short_url = %s', (shortURL,))
        result = cursor.fetchone()
        
        if result is not None:
            # Update the click count
            cursor.execute('UPDATE shortened_url SET click_count = click_count + 1 WHERE short_url = %s RETURNING click_count', (shortURL,))
            self.conn.commit()
            return result[0]  # Return the original URL
        else:
            return -1  # Return -1 if no result is found


    #Entering the 'with' block
    def __enter__(self):
        return self

    #Exiting the 'with' block
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()


#Flask Route to shorten a link
@appS.route('/shorten',methods=['POST'])
def shorten_url():
    data = request.get_json()
    originalURL = data.get('originalURL')
    email = data.get('email')
    customWord = data.get('customWord')
    with SimpleURLShortener() as url_shortener:
        if not customWord:
            shortURL = url_shortener.shorten_url(originalURL,email) #Regular URL shortening
        else:
            shortURL = url_shortener.customShorten_url(email,originalURL,customWord) #Custom word URL shortening
            #if the custom word is already in use
            if shortURL == -1:
                return jsonify({'message':'Custom word already used in another link.'})
        

    return jsonify({'shortenedURL': shortURL,'message':'Shortened successfully.'})


#Route to shorten a link using the API
@appS.route('/apishorten',methods=['POST'])
def shorten_url_api():
    data = request.get_json()

    key = data.get('key')
    with Authentication() as auth:
        #check if api key valid
        if auth.checkAPIKey(key) == False:
            return jsonify({'message':'API Key not valid.'})
    
    
    originalURL = data.get('originalURL')
    if not originalURL.startswith(('http://', 'https://', 'www.')): #Ensure the URL is valid (starts with either of these 3 prefixes)
        return jsonify({'message': 'Original URL not valid.'})
    with SimpleURLShortener() as url_shortener:
        result = url_shortener.shorten_url(originalURL,None)
    
    return jsonify({'message':result})

#Route to resolve/retrieve an original link using API
@appS.route('/apiresolve',methods=['POST'])
def resolveOriginal():
    data = request.get_json()
    key = data.get('key')
    with Authentication() as auth:
        #check if api key valid
        if auth.checkAPIKey(key) == False:
            return jsonify({'message':'API Key not valid.'})

    shortURL = data.get('shortURL')
    with SimpleURLShortener() as url_shortener:
        #get original url
        result = url_shortener.resolve_url(shortURL)
    #if the short url is incorrect
    if result == -1:
        return jsonify({'message':'Short URL incorrect'})
    #return original url
    return jsonify({'message':result})

#Route to retrieve the click count of a short link using the API
@appS.route('/apiclicks',methods=['GET'])
def getClicks():
    data = request.get_json()
    key = data.get('key')
    
    with Authentication() as auth:
        #check if API key valid
        if auth.checkAPIKey(key) == False:
            return jsonify({'message':'API Key not valid.'})

    shortURL = data.get('shortURL')

    with SimpleURLShortener() as url_shortener:
        clicks = url_shortener.getClickCount(shortURL)
    if clicks == -1:
        return jsonify({'message':'Short URL incorrect'})

    return jsonify({'message':clicks})

    
#Route to redirect to an original link when a short link is inputted into the browser
@appS.route('/s/<path:short_url>')
def redirectToOriginal(short_url):
    #To allow for proper original URL resolution even when a custom word is given
    decodedShort = unquote(short_url)

    #fullURL = "http://4p02shortify.com/s/"+decodedShort #For server use only
    fullURL = "http://127.0.0.1:5002/s/"+decodedShort


    with SimpleURLShortener() as url_shortener:
        originalURL = url_shortener.resolve_url(fullURL)
    

    #Ensure the url has http in front of it for the redirect function to work
    pattern = re.compile(r'^(?!https?://).*$', re.IGNORECASE)
    if pattern.match(originalURL):
        originalURL = 'http://'+originalURL
    return redirect(originalURL)#Redirects to the original link


if __name__ == "__main__":
    appS.run(port=5002,debug=True)
    #appS.run(host='0.0.0.0',port=5002) #For server use only
    


