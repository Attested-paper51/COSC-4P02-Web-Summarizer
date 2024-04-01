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
    wrongpassword = "wrongpassword"
    newPassword = "Password1"
    assert not auth.changePassword(email, wrongpassword, "Password2")
    assert auth.changePassword(email2,"Password1",newPassword)


def testResetPassword():
    email = "test@example.com"
    email2 = "registerTest@gmail.com"
    newPassword = "newpassword"
    assert not auth.resetPassword(email, newPassword)
    assert not auth.resetPassword(email2, newPassword)
    assert auth.resetPassword(email2,"Password2")
    assert auth.resetPassword(email2,"Password1")


def testChangeEmail():
    email = "registerTest@gmail.com"
    newEmail = "registerTest2@gmail.com"
    password = "Password1"
    assert not auth.changeEmail("thisDoesntExit@gmail.com",newEmail,password)
    assert not auth.changeEmail(email,newEmail,"ThisAintThePassword2")
    assert auth.changeEmail(email, newEmail,password)
    assert auth.changeEmail(newEmail,email,password)

def testGetName():
    email = "registerTest@gmail.com"
    assert auth.getName(email) == "jake"
    assert not auth.getName(email) == "joe"

def testChangeName():
    email = "registerTest@gmail.com"
    newName = "jake2"
    assert auth.changeName(newName, email)
    assert auth.changeName("jake",email)

def testGetUsername():
    email = "registerTest@gmail.com"
    assert auth.getUsername(email) == "9e6775"
    assert not auth.getUsername(email) == "balhdhq3"

def testIsPasswordCorrect():
    email = "registerTest@gmail.com"
    password = "Password1"
    assert auth.isPasswordCorrect(email, password)
    assert not auth.isPasswordCorrect(email,"wot")

def testCreateTemplateRows():
    email = "registerTest@gmail.com"
    assert auth.createTemplateRows(email)
    assert not auth.createTemplateRows("doesntexist@gmail.com")

def testAddTemplate():
    email = "registerTest@gmail.com"
    word_count = 100
    formality = "formal"
    structure = "structured"
    num_paragraphs = 3
    summ_type = "text"
    timestamps = "timestamp"
    template_name = "customTemplate1"
    length = "medium"
    assert auth.addTemplate(email, word_count, formality, structure, num_paragraphs, summ_type, timestamps, length,template_name)
    assert not auth.addTemplate(email, word_count, formality, structure, num_paragraphs, summ_type, timestamps, length,"Cheese")

def testClearTemplate():
    email = "registerTest@gmail.com"
    template_name = "customTemplate1"
    assert auth.clearTemplate(email, template_name)
    assert not auth.clearTemplate(email,"cheese")

def testDeleteTemplates():
    email = "registerTest@gmail.com"
    assert auth.deleteTemplates(email)
    assert not auth.deleteTemplates("oop@gmail.com")