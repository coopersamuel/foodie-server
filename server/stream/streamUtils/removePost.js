const stream = require('../index');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');

module.exports = async (userId, postId) => {
    // Remove the post from MongoDB
    await Post.deleteOne({ _id: postId });

    // Remove the post from stream
    await stream.feed('user', userId).removeActivity({ foreignId: postId });
};