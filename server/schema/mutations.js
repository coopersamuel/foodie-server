const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = graphql;

// Import mongoose models and lodash functions
const User = mongoose.model('user');
const { pickBy } = require('lodash');

// Import stream instance
const stream = require('../stream');

// Import graphql types
const UserType = require('./types/user_type');
const PostType = require('./types/post_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNewUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                handle: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return (new User({ name: args.name, handle: args.handle })).save();
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                handle: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const argsWithoutNull = pickBy(args); // Filters out null values
                return User.findByIdAndUpdate(args.id, argsWithoutNull, { new: true });
            }
        },
        addActivity: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                const userFeed = stream.feed('user', args.id);

                const activity = {
                    actor: args.id,
                    tweet: args.content,
                    verb: 'tweet',
                    object: 1
                }

                userFeed.addActivity(activity)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
});

module.exports = mutation;