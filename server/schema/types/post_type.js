const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const UserType = require('./user_type');

const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: UserType },
        content: { type: GraphQLString }
    })
});

module.exports = PostType;