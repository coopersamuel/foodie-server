const stream = require('../index');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');

module.exports = async (userId, postId, content) => {
    // Update the post from MongoDB
    const post = await Post.findByIdAndUpdate(postId, { content: content }, { new: true });

    // Build the activity object
    const activity = {
        actor: userId,
        verb: 'post',
        object: postId,
        foreign_id: postId,
        time: post.updatedAt
    }
    // Remove the post from stream
    await stream.updateActivities([activity]);

    return post;
};