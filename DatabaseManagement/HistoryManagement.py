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
        cursor.execute("INSERT INTO summarized (input_text, summarized_text, user_id) VALUES (%s, %s, %s)", (inputData, summarizedData, username))
        self.conn.commit()

    def retrieveHistory(self, username):
        cursor = self.conn.cursor()
        cursor.execute("SELECT id, input_text, summarized_text FROM summarized WHERE user_id=%s", (username,))
        history = cursor.fetchall()
        return history  # Return the fetched history
    
    
    def deleteHistory(self, username, historyID):
        cursor = self.conn.cursor()
        status = "failed"  # Default status
        
        try:
            # Check if historyID is provided and not empty
            if historyID:
                # Attempt to convert historyID to an integer
                historyID_int = int(historyID)
                cursor.execute("DELETE FROM summarized WHERE id = %s", (historyID_int,))
                deleted_individual_row = cursor.rowcount
            elif username:
                # Proceed with deletion by username if historyID is not provided
                cursor.execute("DELETE FROM summarized WHERE user_id = %s", (username,))
                deleted_individual_row = cursor.rowcount
            else:
                # Neither username nor historyID provided correctly
                return status  # Return "failed" status
            
            self.conn.commit()
            
            # Check if rows were deleted
            if deleted_individual_row >= 1:
                status = "success"
        except (ValueError, psycopg2.Error) as e:
            # Handle conversion error or psycopg2 errors
            print(f"Error: {e}")
            self.conn.rollback()  # Roll back the transaction in case of error
        
        return status


        

    def __del__(self):
        self.conn.close()

@appHDB.route('/verify', methods=['POST'])
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

if __name__ == '__main__':
    appHDB.run(port=5001)
