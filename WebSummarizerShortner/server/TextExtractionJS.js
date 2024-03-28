//This code is using nanonet API
// Your fetch code remains the same

const { JSDOM } = require("jsdom"); // Assuming JSDOM is still CommonJS and can be required

// Dynamic import of node-fetch
import("node-fetch").then(({ default: fetch }) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': 'ea8c11dc-c2ed-11ee-91a8-8a158d2e50cc'
    }
  };
  fetch('https://cosc.brocku.ca/~bockusd/3p94/seminartopic2.html', options)
    .then(response => response.text()) // Fetch the page content as plain text
    .then(html => {
      const dom = new JSDOM(html); // Parse the HTML
      const text = dom.window.document.body.textContent; // Extract text content
      console.log(text.trim()); // Log the text content, trimming whitespace
    })
    .catch(err => console.error(err));
});
