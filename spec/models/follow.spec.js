const mongoose = require('mongoose');

// Load the models here b/c we won't be instantiating the express server
require('../../server/models');

const Follow = mongoose.model('follow');

describe('Follow Model', () => {
    it('should not allow a follow without a follower and a followee', () => {
        const follow = new Follow();
        follow.validate(err => {
            expect(err.errors).toHaveProperty('follower');
            expect(err.errors).toHaveProperty('followee');
        });
    });
});