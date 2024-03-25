from flask_cors import CORS
from authentication import Authentication
import time
import pytest

auth = Authentication()

# def testUserTableExists():
    
#     cursor = auth.conn.cursor()
#     cursor.execute("SELECT to_regclass('users')")
#     table = cursor.fetchone()[0] is not None
#     cursor.close()
#     assert table

# def testRegisterUser():
#     cursor = auth.conn.cursor()
#     email = "registerTest@gmail.com"
#     auth.registerUser(email,"Password1","jake")
#     cursor.execute("SELECT * FROM users WHERE email = %s",(email,))
#     table = cursor.fetchone()[0] is not None
#     cursor.close()
#     assert table

def testIfAlreadyRegistered():
    email = "test@gmail.com"
    email2 = "registerTest@gmail.com"
    assert not auth.checkIfAlreadyRegistered(email)
    assert auth.checkIfAlreadyRegistered(email2)

def testFindEmail():
    email = "test@gmail.com"
    email2 = "registerTest@gmail.com"
    assert auth.findEmail(email) is None  # Assuming the email is not found 
    assert auth.findEmail(email2) == email2

def testLoginUser():
    email = "test@example.com"
    email2 = "registerTest@gmail.com"
    password = "password123"
    password2 = "Password1"
    assert not auth.loginUser(email, password)
    assert auth.loginUser(email2,password2)

def testIsPasswordValid():
    assert not auth.isPasswordValid("short")  # Assuming password length is not valid
    assert not auth.isPasswordValid("ALLUPPERCASE")  # Assuming password does not contain digits
    assert not auth.isPasswordValid("nouppercase123")  # Assuming password does not contain uppercase letters
    assert not auth.isPasswordValid("noNumbers")  # Assuming password does not contain numbers
    assert auth.isPasswordValid("ValidPassword1")  # Assuming password is valid


def testDeleteAccount():
    email = "test@example.com"
    email2 = "delete@delete"
    auth.registerUser(email2,"Password1","delete")
    assert not auth.deleteAccount(email)  # Assuming the account deletion fails (email not found)
    assert auth.deleteAccount(email2)
    
def testChangePassword():
    email = "test@example.com"
    email2 = "registerTest@gmail.com"
    password = "oldpassword"
    newPassword = "Password1"
    assert not auth.changePassword(email, password, "Password2")
    assert auth.changePassword(email2,"Password1",newPassword)

#wip
def testResetPassword():
    email = "test@example.com"
    newPassword = "newpassword"
    assert not auth.resetPassword(email, newPassword)


