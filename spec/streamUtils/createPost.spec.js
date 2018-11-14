const mongoose = require('mongoose');
const sandbox = require('sinon').createSandbox();
const stream = require('../../server/stream');

// Load the models here b/c we won't be instantiating the express server
require('../../server/models');

const User = mongoose.model('user');
const Post = mongoose.model('post');
const createPost = require('../../server/stream/streamUtils/createPost');

describe('createPost', () => {
    let userId;
    let post;
    const mockPost = {
        _id: '1234', 
        createdAt: 'now'
    };

    beforeAll(async () => {
        // Create a temporary userId
        userId = new User()._id;

        // Stub out the stream API and Post model
        streamStub = sandbox.stub(stream, 'feed').returns({ addActivity: sandbox.fake.resolves() });
        postStub = sandbox.stub(Post, 'create').resolves(mockPost);

        // Call the createPost function
        post = await createPost(userId, 'some content')
    });

    afterAll(() => {
        // Restore everything in the sandbox to avoid memory leaks
        sandbox.restore();
    });

    it('should return the new post', () => {
        expect(post).toBe(mockPost);
    });

    it('should call the stream addActivity API', () => {
        sandbox.assert.calledOnce(streamStub);
    });
});
