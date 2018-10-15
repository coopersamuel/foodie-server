const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

// Import mongoose models
const User = mongoose.model('user');

// Import stream instance
const stream = require('../stream');

// Import graphql types
const UserType = require('./types/user_type');
const FeedType = require('./types/feed_type');

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
                const userFeed = stream.feed('user', id);

                userFeed.get({ limit: 5 })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    })
});

module.exports = RootQuery;