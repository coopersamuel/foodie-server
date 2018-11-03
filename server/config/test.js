/**
 * Configuration file for test environment
 */

const streamConfig = {
    key: process.env.STREAM_KEY,
    secret: process.env.STREAM_SECRET,
    appId: process.env.STREAM_APP_ID
};

module.exports = {
    streamConfig
}