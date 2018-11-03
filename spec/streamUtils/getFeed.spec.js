const mongoose = require('mongoose');
const sinon = require('sinon');
const { range } = require('lodash');

// Load the models here b/c we won't be instantiating the express server
require('../../server/models');

const User = mongoose.model('user');
const Post = mongoose.model('post');
const getFeed = require('../../server/stream/streamUtils/getFeed');

describe('getFeed', () => {
    const streamFake = sinon.fake();
    let streamGetFeed;

    beforeAll(() => {
        streamGetFeed = sinon.replace(stream.feed, 'get', streamFake);
        sinon.stub(Post, 'find');
    });

    afterAll(() => {
        //Post.find.restore();
        sinon.restore();
    });

    it('should call Post.find for every post id in an array', () => {
        const userId = new User()._id;
        getFeed(userId, 'timeline');
        console.log(streamFake.callCount);
    });
});