import requests


class API:
    def __init__(self):
        pass

    def changePW(self, email, password, newPassword):
        url = 'http://localhost:5001/changepassword'
        data = {'email': email, 'password': password, 'newPassword': newPassword}
        response = requests.post(url, json=data)
        return response.json()['message']

    def testShortenURL(self,apiKey,originalURL):
        url = 'http://localhost:5002/apishorten'
        data = {
            'key': apiKey,
            'originalURL': originalURL, 
        }
        response = requests.post(url,json=data)
        return response.json()['message']


if __name__ == '__main__':
    api = API()
    #response = api.changePW('blahblahblackgoat@gmail.com','Password1','Password1')
    response = api.testShortenURL('notanapikey','https://www.diffchecker.com/text-compare/')
    print(response)
    response = api.testShortenURL('6aff035d57bbbc5a9ccfbc83449b3b9c','raathisisntalinklol')
    print(response)
    response = api.testShortenURL('6aff035d57bbbc5a9ccfbc83449b3b9c','https://www.diffchecker.com/text-compare/')
    print(response)