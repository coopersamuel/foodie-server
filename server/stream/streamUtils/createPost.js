const stream = require('../index');
const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = async (userId, restaurantId, review, comment, media, taggedUsers, hashtags) => {
    // Add the post to the posts collection
    const post = await Post.create({ user: userId, restaurant: restaurantId, review, comment, media, taggedUsers, hashtags })
        .catch(error => {
            throw new Error('Unable to create new post');
        });

    // Build the activity object
    const activity = {
        actor: userId,
        verb: 'post',
        object: post._id,
        foreign_id: post._id,
        time: post.createdAt
    }

    await stream.feed('user', userId).addActivity(activity);

    return post;
};