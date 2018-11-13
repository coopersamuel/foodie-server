const mongoose = require('mongoose');
const sandbox = require('sinon').createSandbox();
const { fill } = require('lodash');
const stream = require('../../server/stream');

// Load the models here b/c we won't be instantiating the express server
require('../../server/models');

const User = mongoose.model('user');
const Post = mongoose.model('post');
const getFeed = require('../../server/stream/streamUtils/getFeed');

describe('getFeed', () => {
    const mockResponse = {
        results: fill(Array(10), {
            object: 'fakeId'
        })
    };

    beforeAll( async () => {
        // Stub out the stream API and Post model
        streamStub = sandbox.stub(stream, 'feed').returns({ get: sandbox.fake.resolves(mockResponse) });
        postStub = sandbox.stub(Post, 'find').returns({ sort: sandbox.fake.resolves() });

        // Call the getFeed function with a userId
        const userId = new User()._id;
        await getFeed(userId, 'timeline');
    });

    afterAll(() => {
        // Restore everything in the sandbox to avoid memory leaks
        sandbox.restore();
    });

    it('should call the stream get API', () => {
        sandbox.assert.calledOnce(streamStub);
    });

    it('should call Post.find with an array of postIds', () => {
        sandbox.assert.calledWith(postStub, { _id: { $in: fill(Array(10), 'fakeId') } });
    });
});
