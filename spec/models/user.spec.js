const mongoose = require('mongoose');

// Load the models here b/c we won't be instantiating the express server
require('../../server/models/user'); 

const User = mongoose.model('user');

describe('User Model', () => {
    it('should not allow a user without a name, username or email', async () => {
        const user = new User();
        user.validate(err => {
            expect(err.errors).toHaveProperty('name');
            expect(err.errors).toHaveProperty('username');
            expect(err.errors).toHaveProperty('email');
        });
    });
});
