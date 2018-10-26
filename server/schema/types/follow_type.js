const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const FollowType = new GraphQLObjectType({
    name: 'FollowType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        handle: { type: GraphQLString },
        posts: { type: GraphQLList(PostType) }
    })
});

module.exports = UserType;