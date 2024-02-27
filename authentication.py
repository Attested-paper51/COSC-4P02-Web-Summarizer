from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

class Authentication:
    def __init__(self):
        self.conn = psycopg2.connect(
            database="database4p02",
            user="postgres",
            password="password",
            host="localhost",
            port="5432"
        )

    def registerUser(self,username,password):
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        self.conn.commit()

    def __del__(self):
        self.conn.close()


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    # Extract user data from the request
    username = data.get('username')
    password = data.get('password')

    # Insert the user data into the database
    userMgr = Authentication()
    userMgr.registerUser(username,password)

    return jsonify({'message': 'User registered successfully'})

if __name__ == '__main__':
    app.run(port=5001)