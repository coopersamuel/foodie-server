const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

// Import mongoose models
const User = mongoose.model('user');

// Import graphql types
const UserType = require('./types/user_type');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            // Query a user given the user's id
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return User.findById(id);
            }
        }
    })
});

module.exports = RootQuery;