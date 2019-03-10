const stream = require('../index');
const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = async (userId, postId, restaurantId, review, comment, media, taggedUsers, hashtags) => {
    // Update the post from MongoDB
    const post = await Post.findByIdAndUpdate(postId, { restaurant: restaurantId, review, comment, media, taggedUsers, hashtags }, { new: true });

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