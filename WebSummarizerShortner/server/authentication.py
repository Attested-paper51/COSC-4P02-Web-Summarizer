from flask import Flask, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS
import re
import hashlib
import requests
import time

appA = Flask(__name__)
CORS(appA)

class Authentication:
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

    #Register a user manually, given an email, password and name
    def registerUser(self,email,password,name):
        username = hashlib.md5(email.encode()).hexdigest()[:6]
        apiKey = self.createAPIKey(username)
        cursor = self.conn.cursor()
        
        cursor.execute("INSERT INTO users (username, email, password, name, login_method, api_key) VALUES (%s, %s, %s, %s, %s, %s)", (username, email, password, name, "manual",apiKey))
        self.conn.commit()

    #Check if a user is already registered. 
    def checkIfAlreadyRegistered(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s", (email,))
        count = cursor.fetchone()[0]
        return count > 0

    #Checking wether an email exists in the DB, and return that email
    def findEmail(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT email FROM users WHERE email = %s",(email,))
        email = cursor.fetchone()
        if email:
            return email[0]
        else:
            return None

    #Login to the user's account given an email and a password (for manual users)
    def loginUser(self,email,password):
        cursor = self.conn.cursor()
        print(self.getLoginMethod(email))
        if (self.getLoginMethod(email) == -1):
            return 0
        elif (self.getLoginMethod(email) != 'manual'):
            return -1
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s AND password = %s AND login_method = 'manual'", (email, password))
        count = cursor.fetchone()[0]
        if count == 1:
            return 1
        return 0

    #Query whether a password is valid based on password requirements
    def isPasswordValid(self, password):
        if not (8 <= len(password) <=20): #Length requirement
            return False

        #Must have an uppercase, and a number
        return any(char.isupper() for char in password) and any(char.isdigit() for char in password)

    #Delete an account - data in users table
    def deleteAccount(self,email):
        cursor = self.conn.cursor()
        if self.findEmail(email) is None:
            return None
        #Delete the row in the users table
        cursor.execute("DELETE FROM users WHERE email = %s",(email,))
        self.conn.commit()
        return 1

    #Change a password given that the current password is known
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
    
    #Resetting a password, given that the user knows their email but does not remember the password.
    def resetPassword(self,email,newPassword):
        cursor = self.conn.cursor()
        if (self.isPasswordValid(newPassword)):
            cursor.execute("UPDATE users SET password = %s WHERE email = %s", (newPassword, email))
            self.conn.commit()
            return 1
        return 0
        

    #Change an email, given the current and new email and the password.
    def changeEmail(self,email,newEmail,password):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s",(email,password))
        userExists = cursor.fetchone()
        if userExists:
            cursor.execute("UPDATE users SET email = %s WHERE email = %s",(newEmail,email))
            self.conn.commit()
            return 1
        else:
            return 0

    #Get the stored name based on a given email
    def getName(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT name FROM users WHERE email = %s",(email,))
        name = cursor.fetchone()[0]
        return name

    #Change the nickname of a given email
    def changeName(self,name,email):
        cursor = self.conn.cursor()
        cursor.execute("UPDATE users SET name = %s WHERE email = %s",(name,email,))
        self.conn.commit()
        return 1

    #Get a username of a given email address
    def getUsername(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT username FROM users WHERE email = %s",(email,))
        username = cursor.fetchone()
        if username:
            return username[0]
        return None

    #Checking if a password matches what is stored in the DB
    def isPasswordCorrect(self,email,password):
        cursor = self.conn.cursor()
        cursor.execute("SELECT password FROM users WHERE email = %s",(email,))
        result = cursor.fetchone()

        if result[0] == password:
            return 1

        return 0

    #Login using Google authentication
    def loginGoogle(self,email,name):
        email2 = f"{email}{time.time()}"
        username = hashlib.md5(email2.encode()).hexdigest()[:6]
        apiKey = self.createAPIKey(username)
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO users (username, email, name, login_method,api_key) VALUES (%s, %s, %s, %s,%s)", (username, email, name, "google",apiKey))
        self.conn.commit()

    #Login using Facebook authentication
    def loginFacebook(self,email,name):
        email2 = f"{email}{time.time()}"
        username = hashlib.md5(email2.encode()).hexdigest()[:6]
        apiKey = self.createAPIKey(username)
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO users (username, email, name, login_method,api_key) VALUES (%s, %s, %s, %s,%s)", (username, email, name, "facebook",apiKey))
        self.conn.commit()

    #Get the login method/signup method that the user used to register
    def getLoginMethod(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT login_method FROM users WHERE email = %s",(email,))
        result = cursor.fetchone()
        if result == None:
            return -1
        return result[0]

    #Create an API key for a user
    def createAPIKey(self,username):
        #Concatenate username with current timestamp
        data = f"{username}{time.time()}"
        #Hash the concatenated string
        hashed_data = hashlib.sha256(data.encode()).hexdigest()
        #Truncate the hash to get a 32-character API key
        apiKey = hashed_data[:32]
        return apiKey
    
    #Return the API key of an account given an email
    def getAPIKey(self,email):
        cursor = self.conn.cursor()
        cursor.execute("SELECT api_key FROM users WHERE email = %s",(email,))
        apiKey = cursor.fetchone()[0]
        return apiKey

    #Checking whether an API key is in the DB
    def checkAPIKey(self,apiKey):
        cursor = self.conn.cursor()
        #print(apiKey)
        cursor.execute("SELECT COUNT(*) FROM users WHERE api_key = %s", (apiKey,))
        result = cursor.fetchone()[0]
        if result > 0:
            return True  # API key found
        else:
            return False  # API key not found



    #Template Logic

    #Creating the three rows assigned to a user when account is created
    def createTemplateRows(self,email):
        cursor = self.conn.cursor()
        if (self.findEmail(email) is None):
            return 0
        user = self.getUsername(email)
        for i in range(1, 4):
            cursor.execute("INSERT INTO templates (username, template_name) VALUES (%s, %s)", (user, f'customTemplate{i}'))
            self.conn.commit()
        return 1
        
    #Populate a template based on an email and template name, filling in the given parameters
    def addTemplate(self,email,formality,
    structure,summType,timestamps,length,citation,template_name):
    #If somehow the template name is not one of the 3 assigned. 
        if (template_name not in ["customTemplate1","customTemplate2","customTemplate3"]):
            return 0

        cursor = self.conn.cursor()
        user = self.getUsername(email)

        cursor.execute("""
            UPDATE templates 
            SET 
                formality = %s, 
                structure = %s, 
                summarization_type = %s,
                timestamps = %s,
                length = %s,
                citation = %s 
            WHERE 
                username = %s 
            AND 
                template_name = %s
        """, (formality, structure, summType, timestamps,length,citation,user,template_name))
        
        self.conn.commit()
        return 1
    #Return the values of a template based on an email and a template name to query
    def getTemplate(self,email,templateName):
        cursor = self.conn.cursor()
        user = self.getUsername(email)
        #If somehow the template name is not one of the 3 assigned. 
        if (templateName not in ["customTemplate1","customTemplate2","customTemplate3"]):
            return 0

        cursor.execute("""
        SELECT formality, structure, summarization_type, timestamps, length, citation
        FROM templates 
        WHERE username = %s 
        AND template_name = %s
        """, (user, templateName))
        templateVals = cursor.fetchone()#Return the whole array of values
        return templateVals

    #Clearing a template based on an email and a template name to clear
    def clearTemplate(self,email,template_name):
        cursor = self.conn.cursor()
        user = self.getUsername(email)
        #If somehow the template name is not one of the 3 assigned. 
        if (template_name not in ["customTemplate1","customTemplate2","customTemplate3"]):
            return 0
        #SQL clear query
        cursor.execute("""
        UPDATE templates 
        SET 
            formality = NULL, 
            structure = NULL, 
            summarization_type = NULL,
            timestamps = NULL,
            length = NULL,
            citation = NULL
        WHERE 
            username = %s 
        AND 
            template_name = %s
        """, (user, template_name))

        
        self.conn.commit()
        return 1

    #Checking if a template is in use given an email and a template name to query.
    def checkTemplateInUse(self,email,templateName):
        cursor = self.conn.cursor()
        user = self.getUsername(email)
        #If somehow the template name is not one of the 3 assigned.
        if (templateName not in ["customTemplate1","customTemplate2","customTemplate3"]):
            return 0

        cursor.execute("""
        SELECT length 
        FROM templates 
        WHERE username = %s 
        AND template_name = %s
        """, (user, templateName))
    
        length = cursor.fetchone()[0]

        #If length is null/None, it means the template is not in use; as it must be something if a template is in use.
        if length is not None:
            return 1  # Template is in use
        else:
            return 0  # Template is not in use

        
    #Deleting the templates for a user's email
    def deleteTemplates(self,email):
        cursor = self.conn.cursor()
        if (self.findEmail(email) is None):
            return 0
        user = self.getUsername(email)
        cursor.execute("DELETE FROM templates WHERE username = %s",(user,))
        self.conn.commit()
        return 1


    #Adding feedback
    def addFeedback(self,stars,text):
        cursor = self.conn.cursor()
        
        cursor.execute("INSERT INTO feedback (stars, text) VALUES (%s, %s)", (stars,text))
        self.conn.commit()
        return 1


    #Adding summarized history
    def addSummarizedHistory(self,input,output,email):
        cursor = self.conn.cursor()
        user = self.getUsername(email)
        if (user is None):
            return -1
        cursor.execute("INSERT INTO summarized (input_text,summarized_text,user_id) VALUES (%s,%s,%s)",(input,output,user))
        self.conn.commit()
        return 1

    #Checking number of summaries in DB
    def getNumSummaries(self,email):
        cursor = self.conn.cursor()
        user = self.getUsername(email)
        if (user is None):
            return -1
        cursor.execute("SELECT COUNT(*) FROM summarized WHERE user_id = %s",(user,))
        count = cursor.fetchone()[0]
        return count

    #Delete all summaries for a given user
    def deleteSummaries(self,email):
        cursor = self.conn.cursor()
        user = self.getUsername(email)
        cursor.execute("DELETE FROM summarized WHERE user_id = %s",(user,))
        self.conn.commit()
        return 1

    #Thumbs up
    def addThumbsUp(self):
        cursor = self.conn.cursor()
        cursor.execute("UPDATE thumbs SET up = up+1")
        self.conn.commit()
        return 1

    #Thumbs down
    def addThumbsDown(self):
        cursor = self.conn.cursor()
        cursor.execute("UPDATE thumbs SET down = down+1")
        self.conn.commit()
        return 1

    
    #Entering the 'with block'
    def __enter__(self):
        return self
    #Close the connection when entering the 'with' block
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()

#Verifying a user is registered; for the purpose of resetting the password.
@appA.route('/verify',methods=['POST'])
def verify():
    data = request.get_json()
    email = data.get('email')
    with Authentication() as userMgr:
        if (userMgr.checkIfAlreadyRegistered(email)):
            loginMethod = userMgr.getLoginMethod(email)
            #If the user registered manually, they can reset their password.
            if (loginMethod == 'manual'):
                return jsonify({'message':'Email found.'})
            #If not manual, cannot reset password.
            return jsonify({'message':'Cannot reset the password of a Google/FB authenticated account.'})
        #Otherwise, the email was not found. 
        return jsonify({'message':'Email not found!'})

#Resetting a user's password, given that they forgot their old.
@appA.route('/reset',methods=['POST'])
def resetPW():
    data = request.get_json()
    email = data.get('email')
    newPassword = data.get('pass')
    with Authentication() as userMgr:
        if not (userMgr.isPasswordValid(newPassword)):
            return jsonify({'message':'New password requirements not met.'})

        userMgr.resetPassword(email,newPassword)
        return jsonify({'message':'Password changed successfully.'})


#Changing a user's password, given that they know their current pass and
@appA.route('/changepassword',methods=['POST'])
def changePW():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    newPassword = data.get('newPassword')

    with Authentication() as userMgr:
        if not (userMgr.isPasswordValid(newPassword)):
            return jsonify({'message':'New password requirements not met.'})

        if (userMgr.changePassword(email,password,newPassword)):
            return jsonify({'message':'Password changed successfully.'})
        else:
            return jsonify({'message':'Current password incorrect.'})

#Change email of a manually authenticated user.
@appA.route('/changeemail',methods=['POST'])
def changeEmail():
    data = request.get_json()
    email = data.get('email')
    newEmail = data.get('newEmail')
    password = data.get('password')

    with Authentication() as userMgr:
        if not (userMgr.isPasswordCorrect(email,password)):
            return jsonify({'message':'Password invalid!'})
        userMgr.changeEmail(email,newEmail,password)
        return jsonify({'message':'Email changed.'})

#Change a user's name (nickname, not username)
@appA.route('/changename',methods=['POST'])
def changeName():
    data = request.get_json()
    email = data.get('email')
    newName = data.get('newname')
    with Authentication() as userMgr:
        userMgr.changeName(newName,email)
    return jsonify({'message':'Name changed.'})

#Register a user manually
@appA.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    # Extract user data from the request
    email = data.get('email')
    password = data.get('pass')
    name = data.get('name')
    
    #Check whether the email is valid
    api_key = os.getenv("EMAILVF_PW")
    url = 'https://api.hunter.io/v2/email-verifier?email={}&api_key={}'.format(email,api_key)
    response = requests.get(url)
    result = response.json()
    
    if 'data' not in result or result['data'].get('result') != 'deliverable':
        return jsonify({'message': 'Email does not exist or is not deliverable.'})

    # Insert the user data into the database
    with Authentication() as userMgr:
        if not (userMgr.isPasswordValid(password)):
            return jsonify({'message':'Password invalid.'})
        if (userMgr.checkIfAlreadyRegistered(email)):
            return jsonify({'message':'Email is already registered.'})
        userMgr.registerUser(email,password,name)
        userMgr.createTemplateRows(email)
        username = userMgr.getUsername(email)
        userMgr.createAPIKey(username)

    return jsonify({'message': 'User registered successfully.'})

#Manual logging in
@appA.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('pass')
    with Authentication() as userMgr:
        #If they've registered manually.
        canLogin = userMgr.loginUser(email,password)
        if (canLogin == 1):
            name = userMgr.getName(email)
            username = userMgr.getUsername(email)
            return jsonify({'message':'User found.','name':name, 'username':username})
        #If they registered with Google/FB
        elif (canLogin == -1):
            print(canLogin)
            return jsonify({'message':'Email is associated with Google/FB authentication.'})
        #If canLogin == 0
        return jsonify({'message':'User not found or password is incorrect.'})

#Delete account
@appA.route('/delete',methods=['POST'])
def deleteAccount():
    data = request.get_json()
    email = data.get('email')
    with Authentication() as userMgr:
        userMgr.deleteSummaries(email)
        userMgr.deleteTemplates(email)
        userMgr.deleteAccount(email)
    
    return jsonify({'message':'Account deleted.'})

#Login with Google
@appA.route('/logingoogle',methods=['POST'])
def loginGoogle():
    data = request.get_json()
    email = data.get('emailGoogle')
    name = data.get('name')
    with Authentication() as userMgr:
        if (userMgr.checkIfAlreadyRegistered(email)):
            #if they're already registered, either they are with the login method we want or they're registered with another one.
            #if registered with another method, dont let them login using this method. email has to be different. 
            if (userMgr.getLoginMethod(email) != 'google'):
                return jsonify({'message':'Email is associated with another log in method, please use that method.'})
            dbName = userMgr.getName(email)
            return jsonify({'message':'Already registered. Logging in.'
            ,'name':dbName})

    
        #If they're not registered, create the necessary rows in DB
        userMgr.loginGoogle(email,name)
        userMgr.createTemplateRows(email)
        #username = userMgr.getUsername(email) #delete
        #userMgr.createAPIKey(username) #delete
        return jsonify({'message':'Registered with Google.'
        ,'name':name})

#Login with facebook
@appA.route('/loginfacebook',methods=['POST'])
def loginFacebook():
    data = request.get_json()
    email = data.get('emailFB')
    name = data.get('name')
    with Authentication() as userMgr:
        if (userMgr.checkIfAlreadyRegistered(email)):
            #if they're already registered, either they are with the login method we want or they're registered with another one.
            #if registered with another method, dont let them login using this method. email has to be different. 
            if (userMgr.getLoginMethod(email) != 'facebook'):
                return jsonify({'message':'Email is associated with another log in method, please use that method.'})
            dbName = userMgr.getName(email)
            return jsonify({'message':'Already registered. Logging in.'
            ,'name':dbName})

        #If they're not already registered and this is the first sign up, log in and create the necessary rows.
        userMgr.loginFacebook(email,name)
        userMgr.createTemplateRows(email)
        #username = userMgr.getUsername(email) #delete
        #userMgr.createAPIKey(username) #delete
        return jsonify({'message':'Registered with Facebook.'
        ,'name':name})

#Save a template based on the parameters the user selects
@appA.route('/savetemplate',methods=['POST'])
def saveTemplate():
    data = request.get_json()
    email = data.get('email')
    formality = data.get('formality')
    structure = data.get('structure')
    summType = data.get('summ_type')
    timestamp = data.get('timestamp')
    length = data.get('length')
    citation = data.get('citation')
    templateName = data.get('templatename')
    with Authentication() as userMgr:
        
        if userMgr.addTemplate(email,formality,structure,summType,timestamp,length,citation,templateName):
            return jsonify({'message':'Template added.'})
        return jsonify({'message':'Not added.'})
    
#Clear a template
@appA.route('/cleartemplate',methods=['POST'])
def clearTemplate():
    data = request.get_json()
    email = data.get('email')
    templateName = data.get('templatename')
    with Authentication() as userMgr:
        userMgr.clearTemplate(email,templateName)
        return jsonify({'message':'Template cleared.'})

#Get the username in the database based on the email
@appA.route('/getusername',methods=['POST'])
def getUsername():
    data = request.get_json()
    email = data.get('email')
    with Authentication() as userMgr:
        username = userMgr.getUsername(email)
        return jsonify({'message':username})

#Get a template based on the email and the template name
@appA.route('/gettemplate',methods=['POST'])
def getTemplate():
    data = request.get_json()
    email = data.get('email')
    
    templateName = data.get('templatename')
    with Authentication() as userMgr:
        templates = userMgr.getTemplate(email,templateName)
        formality = templates[0]
        structure = templates[1]
        summType = templates[2]
        timestamps = templates[3]
        length = templates[4]
        citation = templates[5]
        return jsonify({'length':length, 'formality':formality,
        'structure':structure,'citation':citation,
        'summtype':summType,'timestamps':timestamps})

#Add anonymous feedback to table in the DB
@appA.route('/addfeedback',methods=['POST'])
def addFeedback():
    data = request.get_json()
    stars = data.get('rating')
    text = data.get('feedback')
    
    with Authentication() as userMgr:
        userMgr.addFeedback(stars,text)
        return jsonify({'message':'Feedback added successfully.'})

#Add summary to history
@appA.route('/addsummarized',methods=['POST'])
def addSummarized():
    data = request.get_json()
    email = data.get('email')
    input = data.get('input')
    output = data.get('output')
    with Authentication() as userMgr:
        #if user's stored summaries is <10, save, otherwise display error
        if (userMgr.getNumSummaries(email) < 10):
            userMgr.addSummarizedHistory(input,output,email)
            return jsonify({'message':'Added to history.'})
        
        return jsonify({'message':'Summary history is full. Please delete a previous entry.'})   

#Get an API key for a given email address
@appA.route('/getapikey',methods=['POST'])
def getAPIKey():
    data = request.get_json()
    email = data.get('email')
    with Authentication() as userMgr:
        key = userMgr.getAPIKey(email)
        return jsonify({'key':key})

#Checking whether a template is in use 
@appA.route('/checktemplate',methods=['POST'])
def checkTemplate():
    data = request.get_json()
    email = data.get('email')
    templateName = data.get('templatename')
    with Authentication() as userMgr:
        if userMgr.checkTemplateInUse(email,templateName):
            return jsonify({'message':'Template in use.'})
        
    return jsonify({'message':'Template not in use.'})


#Adding a thumbs up to the thumbs up counter
@appA.route('/thumbsup',methods=['POST'])
def thumbsUp():
    #data = request.get_json()
    with Authentication() as userMgr:
        userMgr.addThumbsUp()
    return jsonify({'message':'Thumbs up'})

#Adding a thumbs down to the thumbs down counter
@appA.route('/thumbsdown',methods=['POST'])
def thumbsDown():
    #data = request.get_json()
    with Authentication() as userMgr:
        userMgr.addThumbsDown()
    return jsonify({'message':'Thumbs down'})





if __name__ == '__main__':
    appA.run(port=5001,debug=True)
    #appA.run(host='0.0.0.0',port=5001) # For server use only
    
