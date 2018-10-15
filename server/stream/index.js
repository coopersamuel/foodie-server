const stream = require('getstream');
const { streamConfig } = require('../config');

// Instantiate the stream client
module.exports = stream.connect(streamConfig.key, streamConfig.secret, streamConfig.appId);