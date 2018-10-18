const stream = require('../index');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');

module.exports = async (userId, content) => {
    // Add the post to the posts collection
    const post = await Post.create({ userId, content });

    // Build the activity object
    const activity = {
        actor: userId,
        verb: 'post',
        object: post._id,
        foreign_id: post._id
    }

    await stream
        .feed('user', userId)
        .addActivity(activity)
        .then(async res => {
            // Post created successfully, add it to the User's posts
            await User.findByIdAndUpdate(userId, { $push: { posts: { postId: post._id } } });
        })
        .catch(err => {
            console.log(err);
        });

    return post;
};