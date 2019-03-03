const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

// Import mongoose models and utils
const User = mongoose.model('user');
const Restaurant = mongoose.model('restaurant');
const { pickBy } = require('lodash');
const streamUtils = require('../stream/streamUtils');

// Import graphql types
const UserType = require('./types/user_type');
const RestaurantType = require('./types/restaurant_type');
const PostType = require('./types/post_type');
const FollowType = require('./types/follow_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                gender: { type: new GraphQLNonNull(GraphQLString) },
                birthDate: { type: new GraphQLNonNull(GraphQLInt) },
                phoneNumber: { type: GraphQLInt },
                location: { type: new GraphQLNonNull(GraphQLString) },
                lat: { type: new GraphQLNonNull(GraphQLFloat) },
                long: { type: new GraphQLNonNull(GraphQLFloat) },
                bio: { type: GraphQLString },
                profilePicture: { type: GraphQLString },
                experiencePreferences: { type: new GraphQLList(GraphQLString) }
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
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                gender: { type: GraphQLString },
                birthDate: { type: GraphQLInt },
                phoneNumber: { type: GraphQLInt },
                location: { type: GraphQLString },
                lat: { type: GraphQLFloat },
                long: { type: GraphQLFloat },
                bio: { type: GraphQLString },
                profilePicture: { type: GraphQLString },
                experiencePreferences: { type: new GraphQLList(GraphQLString) }
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
                restaurantId: { type: new GraphQLNonNull(GraphQLID) },
                review: { type: new GraphQLNonNull(GraphQLInt) },
                comment: { type: GraphQLString },
                media: { type: new GraphQLList(GraphQLString) },
                taggedUsers: { type: new GraphQLList(GraphQLString) },
                hashtags: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parentValue, args) {
                return streamUtils.createPost(args.userId, args.restaurantId, args.review, args.comment, args.media, args.taggedUsers, args.hashtags);
            }
        },
        removePost: {
            type: PostType,
            args: { 
                userId: { type: new GraphQLNonNull(GraphQLID) },
                postId: { type: new GraphQLNonNull(GraphQLID) } 
            },
            resolve(parentValue, args) {
                return streamUtils.removePost(args.userId, args.postId);
            }
        },
        updatePost: {
            type: PostType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLID) },
                postId: {type: new GraphQLNonNull(GraphQLID) },
                restaurantId: { type: GraphQLID },
                review: { type: GraphQLInt },
                comment: { type: GraphQLString },
                media: { type: GraphQLString },
                taggedUsers: { type: GraphQLString },
                hashtags: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return streamUtils.updatePost(args.userId, args.postId, args.restaurantId, args.review, args.comment, args.media, args.taggedUsers, args.hashtags);
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
        },
        unfollow: {
            type: FollowType,
            args: {
                followerId: { type: new GraphQLNonNull(GraphQLID) },
                followeeId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args) {
                return streamUtils.unfollow(args.followerId, args.followeeId);
            }
        },
        createRestaurant: {
            type: RestaurantType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                address1: { type: new GraphQLNonNull(GraphQLString) },
                address2: { type: GraphQLString },
                city: { type: new GraphQLNonNull(GraphQLString) },
                state: { type: new GraphQLNonNull(GraphQLString) },
                zip: { type: new GraphQLNonNull(GraphQLString) },
                phoneNumber: { type: GraphQLInt },
                lat: { type: new GraphQLNonNull(GraphQLFloat) },
                long: { type: new GraphQLNonNull(GraphQLFloat) },
                bio: { type: GraphQLString },
                categories: { type: new GraphQLList(GraphQLString) },
                profilePicture: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return (new Restaurant(args)).save();
            }
        },
        updateRestaurant: {
            type: RestaurantType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                address1: { type: GraphQLString },
                address2: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zip: { type: GraphQLString },
                phoneNumber: { type: GraphQLInt },
                lat: { type: GraphQLFloat },
                long: { type: GraphQLFloat },
                bio: { type: GraphQLString },
                categories: { type: GraphQLString },
                profilePicture: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const argsWithoutNull = pickBy(args); // Filters out null values
                return Restaurant.findByIdAndUpdate(args.id, argsWithoutNull, { new: true });
            }
        },
    }
});

module.exports = mutation;