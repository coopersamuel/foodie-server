const mongoose = require('mongoose');
const graphql = require('graphql');
const { ObjectId } = mongoose.Types;
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

// Import mongoose models and utils
const User = mongoose.model('user');
const streamUtils = require('../stream/streamUtils');

// Import graphql types
const UserType = require('./types/user_type');
const FeedType = require('./types/feed_type');

ObjectId.prototype.valueOf = function() {
    return this.toString()
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            // Query a user given the user's id
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return User.findById(id);
            }
        },
        feed: {
            // Query a users feed given their user id
            type: FeedType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                const posts = streamUtils.getUserFeed(id);
                return { posts };
            }
        }
    })
});

module.exports = RootQuery;