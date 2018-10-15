const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const FeedType = new GraphQLObjectType({
    name: 'FeedType',
    fields: () => ({
        id: { type: GraphQLID }
    })
});

module.exports = FeedType;