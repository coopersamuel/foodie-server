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
const Post = mongoose.model('post');
const Follow = mongoose.model('follow');
const streamUtils = require('../stream/streamUtils');

// Import graphql types
const UserType = require('./types/user_type');
const PostType = require('./types/post_type');
const FeedType = require('./types/feed_type');
const FollowType = require('./types/follow_type');

// This will make sure that an ObjectId from Mongo will always be coerced to a string
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
        post: {
            // Get a post given it's id
            type: PostType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Post.findById(id);
            }
        },
        userFeed: {
            // Query a user's feed given their user id
            type: FeedType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                const posts = streamUtils.getFeed(id, 'user');
                return { posts };
            }
        },
        timelineFeed: {
            // Query a user's timeline feed given their user id
            type: FeedType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                const posts = streamUtils.getFeed(id, 'timeline');
                return { posts };
            }
        },
        followers: {
            // Query a user's followers given their user id
            type: new GraphQLList(FollowType),
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Follow.find({ followee: id });
            }
        },
        following: {
            // Query a user's following given their user id
            type: new GraphQLList(FollowType),
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Follow.find({ follower: id });
            }
        }
    })
});

module.exports = RootQuery;
