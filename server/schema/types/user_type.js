const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const PostType = require('./post_type');

// The user type contains all of the information in the user's profile
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        handle: { type: GraphQLString },
        posts: { type: GraphQLList(PostType) }
    })
});

module.exports = UserType;