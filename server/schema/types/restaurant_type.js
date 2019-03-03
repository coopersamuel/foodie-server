const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = graphql;

// The restaurant type contains all of the information in the restaurant's profile
const RestaurantType = new GraphQLObjectType({
    name: 'RestaurantType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address1: { type: GraphQLString },
        address2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        website: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        long: { type: GraphQLFloat },
        bio: { type: GraphQLString },
        categories: { type: new GraphQLList(GraphQLString) },
        profilePicture: { type: GraphQLString },
        avgRating: { type: GraphQLFloat },
        ratingCount: { type: GraphQLInt }
    })
});

module.exports = RestaurantType;