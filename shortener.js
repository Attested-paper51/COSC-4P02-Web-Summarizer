const axios = require('axios');

const apiKey = '45887b601d56d78743fd009748ed9259b8f3a1b3';
const longURL = 'https://platform.openai.com/docs/guides/text-generation';

const bitlyApiEndpoint = 'https://api-ssl.bitly.com/v4/shorten';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    
};

const data = {
    long_url : longURL,
}; 

axios.post(bitlyApiEndpoint, data, {headers}).then(response => {
    const shortURL = response.data.id;
    const clicks = response.data.clicks;
    console.log('Shortened URL: ', shortURL);
    //console.log('Number of clicks on this link: ',clicks);
})
.catch(error => {
    console.error('Err when shortening: ',error.response ? error.response.data : error.message);
});

// var fetch = require('node-fetch');

// fetch('https://api-ssl.bitly.com/v4/bitlinks/bit.ly/12a4b6c/clicks?unit=month&units=1&unit_reference=2006-01-02T15%3A04%3A05-0700', {
//     headers: {
//         'Authorization': 'Bearer {TOKEN}'
//     }
// })