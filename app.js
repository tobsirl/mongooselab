'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('./config/');
var express = require('express');
var bodyParser = require('body-parser');
//create routing object
var contact = require('./api/contacts/index');


//create an express app
var app = express();

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

//configure the express app to parse JSON-formatted body
app.use(bodyParser.json());

//add static path.
app.use(express.static(config.root));
console.log(config.root);

//Add routes for contacts api
app.get('/api/contacts',contact.index);
app.post('/api/contacts',contact.create);
app.put('/api/contacts/:id',contact.update);
app.delete('/api/contacts/:id',contact.delete);

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(config.port)

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");