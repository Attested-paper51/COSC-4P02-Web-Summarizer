
function shortenURL(longURL,login,apiKey,func) {
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?",
        {
            "format":"json",
            "apiKey": api_key,
            "login" : login,
            "longURL": longURL
        },
        function(response)
        {
            func(response.data.url);
        }
    )
}