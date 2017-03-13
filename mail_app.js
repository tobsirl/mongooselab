var api_key = 'YOUR_KEY';
var domain = 'YOUR_DOMAIN';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var pubnub = require('./config/pubnub.js');

// Subscribe to the demo_tutorial channel
pubnub.subscribe({
    channel: 'create_contact_event',
    message: function(m){console.log('Send email to '+JSON.parse(m).email);
    		var data = {
  			from: 'WIT BSc IT <me@wit.ie',
  			to: JSON.parse(m).email,
  			subject: 'Welcome',
  			text: 'Welcome to the company!!!'
			};
 
		mailgun.messages().send(data, function (error, body) {
  		console.log(body);
		});
	}
});

 
