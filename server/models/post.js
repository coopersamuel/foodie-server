const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbConfig } = require('../config');

// This is the Post schema for mongoose
// This schema contains the data that will be stored in each Post record
const PostSchema = new Schema({
    userId: Schema.Types.ObjectId,
    content: String
}, 
{ 
    timestamps: true,
    collection: dbConfig.postsCollection 
});

// Create a post model
mongoose.model('post', PostSchema);