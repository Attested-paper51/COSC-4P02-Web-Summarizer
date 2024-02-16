import hashlib
import psycopg2
from psycopg2 import sql
from urllib.parse import urlparse
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class SimpleURLShortener:
    def __init__(self):
        # Connect to PostgreSQL database
        self.conn = psycopg2.connect(
            database="database4p02",
            user="postgres",
            password="password",
            host="localhost",
            port="5432"
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

    def shorten_url(self, originalURL):
        # Generate a hash for the original URL
        url_hash = hashlib.md5(originalURL.encode()).hexdigest()[:6]
        # Create a link with the domain and the hash to the end
        shortURL = "http://127.0.0.1:5000/"+url_hash[:6]

        # Store the mapping in the database
        cursor = self.conn.cursor()
        insert_query = sql.SQL("INSERT INTO shortened_url (short_url, original_url, click_count) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING")
        cursor.execute(insert_query, (shortURL, originalURL, 0))
        self.conn.commit()

        # Return the shortened URL
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

        if result:
            cursor.execute('UPDATE shortened_url SET click_count = click_count + 1 WHERE short_url = %s RETURNING click_count', (shortURL,))
            self.conn.commit()
            return result[0]
        else:
            return "URL not found."

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

        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    app.run(port=3000)


