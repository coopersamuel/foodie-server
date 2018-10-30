const stream = require('../index');
const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = async (userId, content) => {
    // Add the post to the posts collection
    const post = await Post.create({ user: userId, content });

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