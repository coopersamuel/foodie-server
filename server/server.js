const express = require('express');
const expressGraphQL = require('express-graphql');
const models = require('./models');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const { dbConfig } = require('./config');

// Create a new express application
const app = express();

// URI for Mongo Atlas instance
const MONGO_URI = `mongodb+srv://${dbConfig.dbUsername}:${dbConfig.dbPassword}@foodiedev-4gdut.gcp.mongodb.net/${dbConfig.dbName}?retryWrites=true`;

// Mongoose's built in promise library is deprecated, replace is with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the MongoDB instance and log a message on success or failure
// Use Mongo's useNewUrlParser option as the old url parser is deprecated
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance'))
    .on('error', error => console.log('Error connecting to MongoDB: ', error));

// Tell mongoose not to use Mongo's 'useFindAndModify' method, it is deprecated 
// Mongoose will resort to using the newer methods for document update
mongoose.set('useFindAndModify', false);

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

// Start the server
app.listen(3000, () => console.log('Foodie server listening on port 3000!\n'));