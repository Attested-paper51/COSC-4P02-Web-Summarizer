import hashlib
import psycopg2
import time
from psycopg2 import sql
from urllib.parse import urlparse
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS
import os
import re
from dotenv import load_dotenv


appS = Flask(__name__)
CORS(appS)

class SimpleURLShortener:
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
        self.create_table()

    def create_table(self):
        # Create the 'shortened_url' table if it doesn't exist
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS shortened_url (
                id INTEGER PRIMARY KEY,
                original_url TEXT,
                short_url TEXT,
                click_count INTEGER DEFAULT 0
            )
        ''')
        self.conn.commit()

    #Generate a random shortened URL given an input original URL
    def shorten_url(self, originalURL,email):
        # Generate a hash for the original URL
        #Applying a unique identifier so that the hash is different even if the same URL is inputted twice
        uniqueIdentifier = str(int(time.time()))
        modURL = originalURL+uniqueIdentifier
        url_hash = hashlib.md5(modURL.encode()).hexdigest()[:6]
        # Create a link with the domain and the hash to the end
        shortURL = "http://127.0.0.1:5000/"+url_hash[:6]
        #shortURL = url_hash[:6]

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
    def customShorten_url(self, originalURL,customString):
        shortURL = "http://127.0.0.1:5000/"+customString

        #check if the custom string is already in the database
        cursor = self.conn.cursor()
        cursor.execute('SELECT id FROM shortened_url WHERE short_url = %s', (shortURL,))
        result = cursor.fetchone()
        if result:
            return -1


        #cursor = self.conn.cursor()
        insert_query = sql.SQL("INSERT INTO shortened_url (short_url, original_url, click_count) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING")
        cursor.execute(insert_query, (shortURL, originalURL, 0))
        self.conn.commit()

        return shortURL

    def getClickCount(self,shortURL):
        cursor = self.conn.cursor()
        cursor.execute('SELECT click_count FROM shortened_url WHERE short_url = %s',(shortURL,))
        count = cursor.fetchone()
        return count[0]

    def resolve_url(self, shortURL):
        
        # Retrieve the original URL from the database
        cursor = self.conn.cursor()
        cursor.execute('SELECT original_url FROM shortened_url WHERE short_url = %s', (shortURL,))
        result = cursor.fetchone()
        cursor.execute('UPDATE shortened_url SET click_count = click_count + 1 WHERE short_url = %s RETURNING click_count', (shortURL,))
        self.conn.commit()
        print(result)
        return result[0]


    def __del__(self):
        # Close the database connection when the object is deleted
        self.conn.close()

def main():
    url_shortener = SimpleURLShortener()

    while True:
        print("\nURL Shortener Menu:")
        print("1. Shorten URL")
        print("2. Resolve Shortened URL")
        print("3. Exit")
        print("4. Custom string")

        choice = input("Enter your choice (1/2/3): ")

        if choice == "1":
            originalURL = input("Enter the URL you want to shorten: ")
            shortened_url = url_shortener.shorten_url(originalURL)
            print("Shortened URL:", shortened_url)

        elif choice == "2":
            short_url = input("Enter the shortened URL: ")
            original_url = url_shortener.resolve_url(short_url)
            print("Original URL:", original_url)
            print("Click count for this link: ",url_shortener.getClickCount(short_url))

        elif choice == "3":
            print("Exiting.")
            break

        elif choice == "4":
            originalURL = input("Enter the URL you wanna shorten: ")
            customString = input("Enter the custom ending for your URL")
            shortened_url = url_shortener.customShorten_url(originalURL,customString)
            while shortened_url == -1:
                customString = input("Custom string already taken, try again: ")
                shortened_url = url_shortener.customShorten_url(originalURL,customString)
            print("Shortened URL: ", shortened_url)


        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

url_shortener = SimpleURLShortener()
@appS.route('/shorten',methods=['POST'])
def shorten_url():
    data = request.get_json()
    originalURL = data.get('originalURL')
    email = data.get('email')

    shortURL = url_shortener.shorten_url(originalURL,email)

    return jsonify({'shortenedURL': shortURL})

@appS.route('/<short_url>')
def redirectToOriginal(short_url):
    fullURL = "http://127.0.0.1:5002/"+short_url
    originalURL = url_shortener.resolve_url(fullURL)
    print(originalURL)
    #Ensure the url has http in front of it.
    pattern = re.compile(r'^(?!https?://).*$', re.IGNORECASE)
    if pattern.match(originalURL):
        originalURL = 'http://'+originalURL
    print(originalURL)
    return redirect(originalURL)


if __name__ == "__main__":
    appS.run(port=5002)
    #main()


