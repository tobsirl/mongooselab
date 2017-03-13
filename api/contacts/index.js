var mongo = require('mongodb');
// get mongo client
var mongoClient = mongo.MongoClient;
var mongoDb;
mongoClient.connect("MONGOLAB_URI", function(err, db) {
  if(!err) {
    console.log("We are connected");
    mongoDb = db;
  }
  else
  {
    console.log("Unable to connect to the db");
  }
});

 var pubnub = require("../../config/pubnub.js")

// Get list of contacts
exports.index = function(req, res) {
	      // Connect to the db
    if (mongoDb){
      var collection = mongoDb.collection('contacts');
      collection.find().toArray(function(err, items) {
        res.send(items);
      });
    }
    else
    {
        console.log('No database object!');
    }

} ;

// Creates a new contact in datastore.
exports.create = function(req, res) {
 var contact = req.body;
    console.log('Adding contact: ' + JSON.stringify(contact));
    if (mongoDb){
      var collection = mongoDb.collection('contacts');
      collection.insert(contact, {w:1}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                pubnub.publish({
                        channel: 'create_contact_event',        
                        message: JSON.stringify(contact),
                        callback : function(m){console.log('New_Contact_Event:' + m)}
                });
                console.log('Success: ' + JSON.stringify(contact));
                res.send(result[0]);
            }
        });
    }
  else
  {
    console.log('No database object!');
  }
};

// Update an existing contact in datastore.
exports.update = function(req, res) {
//TODO
};

// delete an existing contact in datastore.
exports.delete = function(req, res) {
//TODO
};