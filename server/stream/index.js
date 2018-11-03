const stream = require('getstream');
const { streamConfig } = require('../config');

// Instantiate the stream client in any non-testing environment
// TODO - update the config strategy so that you don't need to do this
if (process.env.NODE_ENV !== 'test') {
    module.exports = stream.connect(streamConfig.key, streamConfig.secret, streamConfig.appId);
}