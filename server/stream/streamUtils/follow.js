const stream = require('../index');
const mongoose = require('mongoose');
const Follow = mongoose.model('follow');

module.exports = async (follower, followee) => {
    // Add the follow to the follow collection
    const follow = await Follow.create({ follower, followee });

    await stream.feed('timeline', follower).follow('user', followee);
    
    return follow;
};