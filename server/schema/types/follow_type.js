const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const UserType = require('./user_type');

const FollowType = new GraphQLObjectType({
    name: 'FollowType',
    fields: () => ({
        id: { type: GraphQLID },
        follower: { type: UserType },
        followee: { type: UserType },
    })
});

module.exports = FollowType;