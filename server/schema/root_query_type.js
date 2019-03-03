const mongoose = require('mongoose');
const graphql = require('graphql');
const { ObjectId } = mongoose.Types;
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = graphql;

// Import mongoose models and utils
const User = mongoose.model('user');
const Restaurant = mongoose.model('restaurant');
const Post = mongoose.model('post');
const Follow = mongoose.model('follow');
const streamUtils = require('../stream/streamUtils');

// Import graphql types
const UserType = require('./types/user_type');
const RestaurantType = require('./types/restaurant_type');
const PostType = require('./types/post_type');
const FeedType = require('./types/feed_type');
const FollowType = require('./types/follow_type');

// This will make sure that an ObjectId from Mongo will always be coerced to a string
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

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
    searchUser: {
      // Query a user based on a search term
      type: new GraphQLList(UserType),
      args: { searchTerm: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, args) {
        return await User.find({
          $or: [
            { firstName: new RegExp(`${args.searchTerm}`, 'i') },
            { lastName: new RegExp(`${args.searchTerm}`, 'i') },
            { username: new RegExp(`${args.searchTerm}`, 'i') }
          ]
        });
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Post.findById(id);
      }
    },
    userFeed: {
      // Query a users feed given their user id
      type: FeedType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        const posts = streamUtils.getFeed(id, 'user');
        return { posts };
      }
    },
    timelineFeed: {
      // Query a users feed given their user id
      type: FeedType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        const posts = streamUtils.getFeed(id, 'timeline');
        return { posts };
      }
    },
    followers: {
      // Query a user's followers
      type: new GraphQLList(FollowType),
      args: { followeeId: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, { followeeId }) {
        return await Follow.find({ followee: followeeId });
      }
    },
    following: {
      // Query a user's followees
      type: new GraphQLList(FollowType),
      args: { followerId: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, { followerId }) {
        return await Follow.find({ follower: followerId });
      }
    },
    restaurant: {
      // Query a restaurant given the restaurant's id
      type: RestaurantType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Restaurant.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
