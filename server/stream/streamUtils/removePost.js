const stream = require('../index');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Post = mongoose.model('post');

module.exports = async (userId, postId) => {
    await stream
        .feed('user', userId)
        .removeActivity({ foreignId: postId })
        .then(async res => {
            // Post deleted successfully, now remove from the MongoDB
            await User.findByIdAndUpdate(userId, { $pull: { posts: { postId } } });
            await Post.deleteOne({ _id: postId });
        })
        .catch(err => {
            return err;
        });
};