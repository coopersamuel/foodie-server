const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;


// This is the Restaurant schema for mongoose
// This schema contains the data that will be stored in each Restaurant record
const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address1: {
        type: String,
        trim: true,
        required: true
    },
    address2: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 2
    },
    zip: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5
    },
    phoneNumber: {
        type: Number,
        min: 0,
        max: 9999999999,
        default: null
    },
    website: {
        type: String,
        trim: true,
        default: null
    },
    lat: {
        type: Schema.Types.Double,
        required: true
    },
    long: {
        type: Schema.Types.Double,
        required: true
    },
    bio: {
        type: String,
        trim: true,
        default: null
    },
    categories: {
        type: [String],
        default: null
    },
    profilePicture: {
        type: String,
        trim: true,
        //Need to change this URL to blank profile picture default
        default: ''
    },
    avgRating: { 
        type: Schema.Types.Double, 
        default: 0
    },
    ratingCount: { 
        type: Number, 
        default: 0 
    }
}, 
{ 
    timestamps: true
});

// Create a restaurant model
mongoose.model('restaurant', RestaurantSchema);
