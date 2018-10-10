const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { usersCollection } = require('../config');

// This is the User schema for mongoose
// This schema contains the data that will be stored in each User record
const UserSchema = new Schema({
    name: String,
    handle: String
}, { collection: usersCollection });

// Create a user model
mongoose.model('user', UserSchema);