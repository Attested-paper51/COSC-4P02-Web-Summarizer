from flask import Flask, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Authentication:
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

    def registerUser(self,username,password):
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        self.conn.commit()

    def checkIfAlreadyRegistered(self,username):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE username = %s", (username,))
        count = cursor.fetchone()[0]
        return count > 0

    def __del__(self):
        self.conn.close()


@app.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    # Extract user data from the request
    username = data.get('user')
    password = data.get('pass')

    # Insert the user data into the database
    userMgr = Authentication()
    if (userMgr.checkIfAlreadyRegistered(username)):
        return jsonify({'message':'Username is already taken'})
    userMgr.registerUser(username,password)
    #print("request made")

    return jsonify({'message': 'User registered successfully'})

if __name__ == '__main__':
    app.run(port=5001)