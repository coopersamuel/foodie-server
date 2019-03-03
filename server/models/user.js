const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the User schema for mongoose
// This schema contains the data that will be stored in each User record
const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        match: RegExp('\\S+@\\S+\\.\\S+','i'),
        required: true,
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        match: RegExp('^@','i'),
        required: true,
    },
    // password: {
        // Add this stuff later
        // type: String,
        // required: true,
        // bcrypt: true,
    // },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        trim: true,
        required: true,
        enum: ['M','F','U']
    },
    birthDate: {
        type: Number,
        required: true,
        min: 19000000,
        max: 21000000
    },
    phoneNumber: {
        type: Number,
        min: 0,
        max: 9999999999,
        default: null
    },
    location: {
        type: String,
        trim: true,
        required: true
    },
    lat: {
        type: Schema.Types.Decimal128,
        required: true
    },
    long: {
        type: Schema.Types.Decimal128,
        required: true
    },
    bio: {
        type: String,
        trim: true,
        default: null
    },
    profilePicture: {
        type: String,
        trim: true,
        //Need to change this URL to blank profile picture default
        default: ''
    },
    experiencePreferences: {
        type: [String],
        default: null
    },
    followerCount: { 
        type: Number, 
        default: 0 
    },
    followingCount: { 
        type: Number, 
        default: 0 
    }
}, 
{ 
    timestamps: true
});

// Create a user model
mongoose.model('user', UserSchema);
