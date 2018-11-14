const stream = require('../index');
const mongoose = require('mongoose');
const Follow = mongoose.model('follow');

module.exports = async (follower, followee) => {
    // Remove the follow from the follow collection
    const unfollow = await Follow.findOne({ follower, followee })
        .catch(error => {
            throw new Error('Unable to locate this follow');
        });

    await unfollow.remove();
    await stream.feed('timeline', follower).unfollow('user', followee);

    return unfollow;
};