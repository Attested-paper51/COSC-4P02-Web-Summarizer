
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
    );
}

var login = "jakematrix2013";
var apiKey = "45887b601d56d78743fd009748ed9259b8f3a1b3";
var longURL = "https://platform.openai.com/docs/guides/text-generation";

shortenURL(longURL,login,apiKey,
    function(short_url){
        console.log(short_url);

});