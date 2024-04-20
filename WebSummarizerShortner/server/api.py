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

    def testResolveURL(self,apiKey,shortURL):
        url = 'http://localhost:5002/apiresolve'
        data = {
            'key':apiKey,
            'shortURL': shortURL,
        }
        response = requests.post(url,json=data)
        return response.json()['message']

    def testGetClicks(self,apiKey,shortURL):
        url = 'http://localhost:5002/apiclicks'
        data = {
            'key':apiKey,
            'shortURL': shortURL,
        }
        response = requests.get(url,json=data)
        return response.json()['message']



if __name__ == '__main__':
    api = API()
    #response = api.changePW('blahblahblackgoat@gmail.com','Password1','Password1')
    #response = api.testShortenURL('fa227506d5e324468e3313a9f474d43c','https://www.diffchecker.com/text-compare/')
    # print(response)
    # response = api.testShortenURL('6aff035d57bbbc5a9ccfbc83449b3b9c','raathisisntalinklol')
    # print(response)
    # response = api.testShortenURL('6aff035d57bbbc5a9ccfbc83449b3b9c','https://www.diffchecker.com/text-compare/')
    # print(response)
    #response = api.testResolveURL('6aff035d57bbbc5a9ccfbc83449b3b9c',"htafejf")
    #print(response)

    response = api.testGetClicks('6aff035d57bbbc5a9ccfbc83449b3b9c',"rahdhahfd")
    print(response)
    response = api.testGetClicks('6aff035d57bbbc5a9ccfbc83449b3b9c',"http://127.0.0.1:5002/52f96f/render")
    print(response)
