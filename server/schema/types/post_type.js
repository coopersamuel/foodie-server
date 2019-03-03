const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = graphql;

const UserType = require('./user_type');
const RestaurantType = require('./restaurant_type');

const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: UserType },
        restaurant: { type: RestaurantType },
        review: { type: GraphQLInt },
        comment: { type: GraphQLString },
        media: { type: new GraphQLList(GraphQLString) },
        taggedUsers: { type: new GraphQLList(GraphQLString) },
        hashtags: { type: new GraphQLList(GraphQLString) }
    })
});

module.exports = PostType;