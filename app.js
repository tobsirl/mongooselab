var express = require('express');
var bodyParser = require('body-parser');
//create an express app
var app = express();

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

//add route for the root
app.get('/',function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("We're up and running!!!");
});

//create routing object
var contact = require('./api/contacts/index');
//Add routes for contacts api
app.get('/api/contacts',contact.index);
app.post('/api/contacts',contact.create);
// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(8000)
// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");