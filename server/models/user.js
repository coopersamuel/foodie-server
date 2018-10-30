const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbConfig } = require('../config');

// This is the User schema for mongoose
// This schema contains the data that will be stored in each User record
const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    // password: {
        // Add this stuff later
        // type: String,
        // required: true,
        // bcrypt: true,
    // },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    bio: {
        type: String,
        trim: true,
        default: '',
    },
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 }
}, 
{ 
    timestamps: true
});

// Create a user model
mongoose.model('user', UserSchema);
