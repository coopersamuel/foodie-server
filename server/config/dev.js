/**
 * Configuration file for dev environment
 */

const dbConfig = {
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
};

const streamConfig = {
    key: process.env.STREAM_KEY,
    secret: process.env.STREAM_SECRET,
    appId: process.env.STREAM_APP_ID
};

const mongoUri = `mongodb+srv://${dbConfig.dbUsername}:${dbConfig.dbPassword}@foodiedev-4gdut.gcp.mongodb.net/${dbConfig.dbName}?retryWrites=true`

module.exports = {
    dbConfig,
    streamConfig,
    mongoUri
}