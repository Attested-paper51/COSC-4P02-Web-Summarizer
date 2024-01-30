import pyshorteners

def shortenURL():
    longURL = input("Enter URL: ")
    shorty = pyshorteners.Shortener(api_key='45887b601d56d78743fd009748ed9259b8f3a1b3')
    shortURL = shorty.bitly.short(longURL)

    print("Shortened URL: "+ shortURL)
    countClicks = shorty.bitly.total_clicks(shortURL)
    print("Number of clicks on this URL: "+str(countClicks))


shortenURL()