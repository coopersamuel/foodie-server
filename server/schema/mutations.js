const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

// Import mongoose models and utils
const User = mongoose.model('user');
const { pickBy } = require('lodash');
const streamUtils = require('../stream/streamUtils');

// Import graphql types
const UserType = require('./types/user_type');
const PostType = require('./types/post_type');
const FollowType = require('./types/follow_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNewUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                bio: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return (new User(args)).save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                email: { type: GraphQLString },
                username: { type: GraphQLString },
                name: { type: GraphQLString },
                bio: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const argsWithoutNull = pickBy(args); // Filters out null values
                return User.findByIdAndUpdate(args.id, argsWithoutNull, { new: true });
            }
        },
        createPost: {
            type: PostType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return streamUtils.createPost(args.userId, args.content);
            }
        },
        removePost: {
            type: PostType,
            args: { 
                userId: { type: new GraphQLNonNull(GraphQLID) },
                postId: { type: new GraphQLNonNull(GraphQLID) } 
            },
            resolve(parentValue, { userId, postId }) {
                return streamUtils.removePost(userId, postId);
            }
        },
        follow: {
            type: FollowType,
            args: {
                followerId: { type: new GraphQLNonNull(GraphQLID) },
                followeeId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args) {
                return streamUtils.follow(args.followerId, args.followeeId);
            }
        }
    }
});

module.exports = mutation;