import pytest

from shortenerNoFlask import SimpleURLShortener



def testTableCreated():
    urlShortener = SimpleURLShortener()
    cursor = urlShortener.conn.cursor()
    cursor.execute("SELECT to_regclass('shortened_url')")
    table = cursor.fetchone()[0] is not None
    cursor.close()
    assert table, "The table does not exist in the database."

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

#test unique URL creation
def testUniqueURL():
    urlShortener = SimpleURLShortener()
    original_url = "wwww.testingUnique.com"
    short_url_1 = urlShortener.shorten_url(original_url)
    short_url_2 = urlShortener.shorten_url(original_url)
    assert short_url_1 != short_url_2


#test custom URL creation
def testCustomURLMade():
    urlShortener = SimpleURLShortener()
    originalURL = "www.testingCustom.com"
    short_url = urlShortener.customShorten_url(originalURL,"customTest")
    assert short_url == "www.testingCustom.com/customTest"
    short_url = urlShortener.customShorten_url(originalURL,"customTest")
    assert short_url == -1

#--obsolete with the above assertion
#test that there cannot exist 2 of the same custom URLs
def testNoSameCustomURL():
    pass
        
    





