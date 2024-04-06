import requests


class API:
    def __init__(self):
        pass

    def changePW(self, email, password, newPassword):
        url = 'http://localhost:5001/changepassword'
        data = {'email': email, 'password': password, 'newPassword': newPassword}
        response = requests.post(url, json=data)
        return response.json()['message']


if __name__ == '__main__':
    api = API()
    response = api.changePW('blahblahblackgoat@gmail.co','Password1','Password1')
    print(response)