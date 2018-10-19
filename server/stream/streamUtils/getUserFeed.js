const stream = require('../index');
const mongoose = require('mongoose');
const Post = mongoose.model('post');
const { map } = require('lodash');

module.exports = async (userId) => {
    let postIds = [];

    await stream
        .feed('user', userId)
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
    return await Post.find({ _id: { $in: postIds } });
};