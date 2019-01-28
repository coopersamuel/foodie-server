const createPost = require('./createPost');
const getFeed = require('./getFeed');
const removePost = require('./removePost');
const follow = require('./follow');
const unfollow = require('./unfollow');
const updatePost = require('./updatePost');

module.exports = {
    createPost,
    getFeed,
    removePost,
    follow,
    unfollow,
    updatePost
};