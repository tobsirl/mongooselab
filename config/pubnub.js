'use strict';

// Mail service configuration
// ===========================
module.exports = require("pubnub").init({
            publish_key : "YOUR_PUBLISH_KEY",
            subscribe_key : "YOUR_SUBSCRIBE_KEY"
     });