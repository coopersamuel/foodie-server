const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = graphql;

// The user type contains all of the information in the user's profile
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        name: { type: GraphQLString },
        bio: { type: GraphQLString },
        followerCount: { type: GraphQLInt },
        followingCount: { type: GraphQLInt }
    })
});

module.exports = UserType;