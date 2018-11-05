const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const User = mongoose.model('user');

// Follow schema
// Each document has a follower and a followee
const FollowSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: {
            select: [
                'name',
                'email',
                'username',
                'bio'
            ]
        }
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: {
            select: [
                'name',
                'email',
                'username',
                'bio'
            ]
        }
    }
},
{
    timestamps: true
});

FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

FollowSchema.post('save', async function(doc, next) {
    // Once a follow is saved, update both the follower and followee's 
    // documents in the User collection

    console.log('was called');

    // Follower
    await User.findByIdAndUpdate(doc.follower, { $inc: { followingCount: 1 } });

    // Followee
    await User.findByIdAndUpdate(doc.followee, { $inc: { followerCount: 1 } });
    next();
});

FollowSchema.post('remove', async function(doc, next) {
    // When a follow is removed, decrement the following count

    // Follower 
    await User.findByIdAndUpdate(doc.follower, { $inc: { followingCount: -1 } });

    // Followee 
    await User.findByIdAndUpdate(doc.followee, { $inc: { followerCount: -1 } });
    next();
});

FollowSchema.plugin(autopopulate);

mongoose.model('follow', FollowSchema);