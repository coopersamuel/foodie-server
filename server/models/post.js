const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { dbConfig } = require('../config');

// This is the Post schema for mongoose
// This schema contains the data that will be stored in each Post record
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: {
            select: [
                'name',
                'email',
                'username',
                'bio'
            ],
        },
    },
    content: String
}, 
{ 
    timestamps: true,
    collection: dbConfig.postsCollection 
});

PostSchema.plugin(autopopulate);

// Create a post model
mongoose.model('post', PostSchema);