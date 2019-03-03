const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = graphql;

// The user type contains all of the information in the user's profile
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
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
        experiencePreferences: { type: new GraphQLList(GraphQLString) },
        followerCount: { type: GraphQLInt },
        followingCount: { type: GraphQLInt }
    })
});

module.exports = UserType;