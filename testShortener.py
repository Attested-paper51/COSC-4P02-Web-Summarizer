import pytest

from shortenerNoFlask import SimpleURLShortener




#def urlShortener():
#    return SimpleURLShortener

def testTableCreated():
    pass

def testlinkShortened():
    urlShortener = SimpleURLShortener()
    original_url = "www.testing.com"
    short_url = urlShortener.shorten_url(original_url)
    assert short_url is not None

            

def testLinkRedirected():
    urlShortener = SimpleURLShortener()
    original_url = "www.testing.com"
    short_url = urlShortener.shorten_url(original_url)
    resolved_url = urlShortener.resolve_url(short_url)
    assert resolved_url == original_url
        

def testClickCountInitial():
    urlShortener = SimpleURLShortener()
    original_url = "www.testingCountIsZero.com"
    short_url = urlShortener.shorten_url(original_url)
    initialCount = urlShortener.getClickCount(short_url)
    assert initialCount == 0

def testClickCountUpdated():
    urlShortener = SimpleURLShortener()
    original_url = "www.testingCount.com"
    short_url = urlShortener.shorten_url(original_url)
    resolved_url = urlShortener.resolve_url(short_url)
    count = urlShortener.getClickCount(short_url)
    assert count == 1
        
    





