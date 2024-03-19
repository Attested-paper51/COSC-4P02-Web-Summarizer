from flask import Flask, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS
import re
import hashlib
import requests

appA = Flask(__name__)
CORS(appA)

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

    def registerUser(self,email,password,name):
        username = hashlib.md5(email.encode()).hexdigest()[:6]
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO users (username, email, password, name) VALUES (%s, %s, %s, %s)", (username, email, password, name))
        self.conn.commit()

    def checkIfAlreadyRegistered(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s", (email,))
        count = cursor.fetchone()[0]
        return count > 0

    def findEmail(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s",(email,))
        email = cursor.fetchone()
        return email

    def loginUser(self,email,password):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s AND password = %s", (email, password))
        count = cursor.fetchone()[0]
        return count == 1

    def isPasswordValid(self, password):
        if not (8 <= len(password) <=20):
            return False

        return any(char.isupper() for char in password) and any(char.isdigit() for char in password)

    def deleteAccount(self,email):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM users WHERE email = %s",(email,))
        self.conn.commit()

    def changePassword(self,email,password,newPassword):

        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        userExists = cursor.fetchone()

        if userExists:
            cursor.execute("UPDATE users SET password = %s WHERE email = %s", (newPassword, email))
            self.conn.commit()
            #Passwords match
            return 1
        else:
            #Passwords don't match
            return 0
    
    def resetPassword(self,email,newPassword):
        cursor = self.conn.cursor()
        cursor.execute("UPDATE users SET password = %s WHERE email = %s", (newPassword, email))
        self.conn.commit()

    
    def changeEmail(self,email,newEmail,password):
        cursor = self.conn.cursor()
        cursor.execute("SELCT * FROM users WHERE email = %s AND password = %s",(email,password))
        #it should be implied that the user exists, no?
        userExists = cursor.fetchone()

        if userExists:
            cursor.execute("UPDATE users SET email = %s WHERE email = %s",(newEmail,email))
            self.conn.commit()
            return 1
        else:
            return 0

    def getName(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT name FROM users WHERE email = %s",(email,))
        name = cursor.fetchone()[0]
        return name


    def __del__(self):
        self.conn.close()

@appA.route('/verify',methods=['POST'])
def verify():
    data = request.get_json()
    email = data.get('email')
    userMgr = Authentication()
    if (userMgr.checkIfAlreadyRegistered(email)):
        return jsonify({'message':'Email found.'})
    return jsonify({'message':'Email not found!'})

#Resetting a user's password, given that they forgot their old.
@appA.route('/reset',methods=['POST'])
def resetPW():
    data = request.get_json()
    email = data.get('email')
    newPassword = data.get('pass')
    userMgr = Authentication()
    if not (userMgr.isPasswordValid(newPassword)):
        return jsonify({'message':'New password requirements not met.'})

    userMgr.resetPassword(email,newPassword)
    return jsonify({'message':'Password changed successfully.'})


#Changing a user's password, given that they know their current pass and
#Just want to change it.
@appA.route('/changepassword',methods=['POST'])
def changePW():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    newPassword = data.get('newPassword')#depends

    userMgr = Authentication()
    if not (userMgr.isPasswordValid(newPassword)):
        return jsonify({'message':'New password requirements not met.'})

    if (userMgr.changePassword(email,password,newPassword)):
        return jsonify({'message':'Password changed successfully.'})
    else:
        return jsonify({'message':'Current password incorrect.'})

@appA.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    # Extract user data from the request
    email = data.get('email')
    password = data.get('pass')
    name = data.get('name')
    
    #Add this to .env
    api_key = 'd321a91641fa776088ed4673351eafb1625dd4b1'
    url = 'https://api.hunter.io/v2/email-verifier?email={}&api_key={}'.format(email,api_key)

    response = requests.get(url)
    result = response.json()
    
    if 'data' not in result or result['data'].get('result') != 'deliverable':
        return jsonify({'message': 'Email does not exist or is not deliverable.'})
    # Insert the user data into the database
    userMgr = Authentication()
    if not (userMgr.isPasswordValid(password)):
        return jsonify({'message':'Password invalid.'})

    if (userMgr.checkIfAlreadyRegistered(email)):
        return jsonify({'message':'Email is already registered.'})
    userMgr.registerUser(email,password,name)
    #print("request made")

    return jsonify({'message': 'User registered successfully.'})

@appA.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    # Extract user data from the request
    email = data.get('email')
    password = data.get('pass')

    userMgr = Authentication()
    if (userMgr.loginUser(email,password)):
        name = userMgr.getName(email)
        return jsonify({'message':'User found.','name':name})
    return jsonify({'message':'User not found or password is incorrect.'})

@appA.route('/delete',methods=['POST'])
def deleteAccount():
    data = request.get_json()
    email = data.get('email')
    userMgr = Authentication()
    userMgr.deleteAccount(email)
    return jsonify({'message':'Account deleted.'})


if __name__ == '__main__':
    appA.run(port=5001)
