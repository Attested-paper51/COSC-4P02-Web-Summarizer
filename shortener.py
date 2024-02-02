import pyshorteners
import requests

#shortenURL works using the pyshorteners library, only provides access to click counting

def shortenURL():
    print("Using pyshorteners")
    longURL = input("Enter URL: ")
    shorty = pyshorteners.Shortener(api_key='45887b601d56d78743fd009748ed9259b8f3a1b3')
    shortURL = shorty.bitly.short(longURL)


    print("Shortened URL: "+ shortURL)
    clickedURL = input("Enter a bitly URL to get metrics for it: ")
    countClicks = shorty.bitly.total_clicks(clickedURL)
    print("Number of clicks on this URL: "+str(countClicks))


#This seems to run, but it says that I'd need to upgrade my account to access this,
#Not sure that this is worth it
def shortenURLReqs():
    api_key='45887b601d56d78743fd009748ed9259b8f3a1b3'
    shortURL = input("Enter a bitly URL to get metrics for it: ")
    headers = {
        'Authorization': 'Bearer {api_key}',
    }

    params = (
        ('unit','month'),
        ('units','1'),
        ('unit_reference','2006-01-02T15:04:05-0700'),
    )
    shortURL = shortURL.split('/')[-1]
    response = requests.get('https://api-ssl.bitly.com/v4/bitlinks/{shortURL}/clicks/summary')
    

shortenURL()
#shortenURLReqs()