const stream = require('getstream');
const { streamConfig } = require('../config');

module.exports = stream.connect(streamConfig.key, streamConfig.secret, streamConfig.appId);
