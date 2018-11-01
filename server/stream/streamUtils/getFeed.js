const stream = require('../index');
const mongoose = require('mongoose');
const Post = mongoose.model('post');
const { map } = require('lodash');

module.exports = async (userId, feedType) => {
    let postIds = [];

    await stream
        .feed(feedType, userId)
        .get({ limit: 10 })
        .then(res => {
            postIds = map(res.results, post => {
                return post.object;
            });
        })
        .catch(err => {
            return err;
        });

    // Retrieve the User's posts
    return await Post.find({ _id: { $in: postIds } }).sort({ createdAt: 'descending' });
};