const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        content: { type: GraphQLString }
    })
});

module.exports = PostType;