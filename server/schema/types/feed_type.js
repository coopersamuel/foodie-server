const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

const PostType = require('./post_type');

const FeedType = new GraphQLObjectType({
    name: 'FeedType',
    fields: () => ({
        posts: { type: new GraphQLList(PostType) }
    })
});

module.exports = FeedType;