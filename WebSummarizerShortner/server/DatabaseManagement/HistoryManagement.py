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

            if historyID:

                historyID_int = int(historyID)
                cursor.execute("DELETE FROM summarized WHERE id = %s", (historyID_int,))
                deleted_individual_row = cursor.rowcount
            elif username:

                cursor.execute("DELETE FROM summarized WHERE user_id = %s", (username,))
                deleted_individual_row = cursor.rowcount
            else:
                return status
            
            self.conn.commit()
            

            if deleted_individual_row >= 1:
                status = "success"
        except (ValueError, psycopg2.Error) as e:
            
            print(f"Error: {e}")
            self.conn.rollback()
        
        return status


        

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

if __name__ == '__main__':
    appHDB.run(port=5005)
