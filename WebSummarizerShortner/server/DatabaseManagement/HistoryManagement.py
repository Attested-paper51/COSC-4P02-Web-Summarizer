"""
This program is the backend for managing users' history. if you want to
test this, please look for testHistory.html file. To do so, run this server
code, and open testHistory.html file. Please note that these both should be
done on local machine. Also ensure that .env file on your machine contains 
the required password for the database.
"""
from flask import Flask, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS

appHDB = Flask(__name__)
CORS(appHDB)

class UserHistoryManagement:
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

    def insertHistory(self, inputData, summarizedData, username):
        cursor = self.conn.cursor()

        
        cursor.execute("SELECT COUNT(*) FROM summarized WHERE user_id = %s", (username,))
        count = cursor.fetchone()[0]

        if count >= 5:
            
            cursor.execute("""
                DELETE FROM summarized
                WHERE id = (
                    SELECT id FROM summarized
                    WHERE user_id = %s
                    ORDER BY id ASC
                    LIMIT 1
                )
            """, (username,))

        
        cursor.execute("""
            INSERT INTO summarized (input_text, summarized_text, user_id)
            VALUES (%s, %s, %s)
        """, (inputData, summarizedData, username))
        self.conn.commit()

    def retrieveHistory(self, username):
        cursor = self.conn.cursor()
        cursor.execute("SELECT id, input_text, summarized_text FROM summarized WHERE user_id=%s", (username,))
        history = cursor.fetchall()
        return history
    
    
    def deleteHistory(self, username, historyID):
        cursor = self.conn.cursor()
        status = "failed"
        
        try:
            # Convert historyID to integer to prevent SQL injection and ensure proper query execution
            historyID_int = int(historyID)
            # Execute the delete operation only if both username and historyID match the entry
            cursor.execute("""
                DELETE FROM summarized 
                WHERE id = %s AND user_id = %s
            """, (historyID_int, username))
            
            self.conn.commit()

            # Check if a row was actually deleted
            if cursor.rowcount >= 1:
                status = "success"
            else:
                status = "failed: no matching entry found"

        except (ValueError, psycopg2.Error) as e:
            print(f"Error: {e}")
            self.conn.rollback()
            status = "failed: exception occurred"
        
        return status


    def retrieveURLHistory(self, username):
        cursor = self.conn.cursor()
        
        cursor.execute("""
            SELECT id, original_url, short_url, click_count 
            FROM shortened_url 
            WHERE user_id=%s
            ORDER BY id DESC 
        """, (username,))
        historyURL = cursor.fetchall()
        return historyURL

    def deleteShortenedURL(self, username, urlID):
        cursor = self.conn.cursor()
        try:
            # First, verify the ownership of the URL entry by matching both user_id and id.
            cursor.execute("""
                DELETE FROM shortened_url
                WHERE id = %s AND user_id = %s
            """, (urlID, username))
            self.conn.commit()
            # Check if the row was deleted successfully
            if cursor.rowcount == 1:
                return "success"
            else:
                # Row not found or username did not match
                return "failed: URL not found or user mismatch"
        except (Exception, psycopg2.DatabaseError) as error:
            print(f"Error: {error}")
            self.conn.rollback()
            return "failed: database error"


    def __del__(self):
        self.conn.close()

@appHDB.route('/saveSummary', methods=['POST'])
def insertHistoryHandler():
    data = request.get_json()
    
    username = data.get('username')
    inputText = data.get('inputT')
    summarizedText = data.get('summarizedT')

    manageHistory = UserHistoryManagement()
    manageHistory.insertHistory(inputText, summarizedText, username=username)
    return jsonify({'message': 'Data submitted successfully.'})

@appHDB.route('/history', methods=['POST'])
def retrieveHistoryHandler():
    data = request.get_json()
    username = data.get('username')

    manageHistory = UserHistoryManagement()
    history = manageHistory.retrieveHistory(username)
    return jsonify({'history': history})

@appHDB.route('/deleteHistory', methods=['POST'])
def deleteHistoryHandler():
    data = request.get_json()
    username = data.get('username')
    print("this is username:", username)
    historyID = data.get('historyID')
    manageHistory = UserHistoryManagement()
    status = manageHistory.deleteHistory(username, historyID)
    message = "Deletion successful." if status == "success" else "Deletion failed."
    return jsonify({'status': status, 'message': message})

@appHDB.route('/shortenedHistory', methods=['POST'])
def retrieveShortenedHistoryHandler():
    data = request.get_json()
    username = data.get('username')  # Get the username from the request body

    manageHistory = UserHistoryManagement()
    shortenedURLs = manageHistory.retrieveURLHistory(username)  # Fetch shortened URL history for the user
    # Return the shortened URL history as JSON
    return jsonify({'shortenedURLs': shortenedURLs})

@appHDB.route('/deleteURL', methods=['POST'])
def deleteShortenedURLHandler():
    data = request.get_json()
    username = data.get('username')
    urlID = data.get('urlID')  # Assuming the frontend sends this as urlID

    manageHistory = UserHistoryManagement()
    result = manageHistory.deleteShortenedURL(username, urlID)
    if result == "success":
        return jsonify({'status': 'success', 'message': 'URL deleted successfully.'})
    else:
        return jsonify({'status': 'failed', 'message': result}), 400

if __name__ == '__main__':
    appHDB.run(port=5005)
    #appHDB.run(host='0.0.0.0',port=5005) #Server use only
