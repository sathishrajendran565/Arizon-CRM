const { GraphQLServerLambda } = require("graphql-yoga");
var fs = require("fs");

const typeDefs = fs.readFileSync("./schema.gql").toString("utf-8");

const resolvers = {
  Query: {
    postgresql_getUser: require("./resolver/Query/postgresql_getUser").func,
    postgresql_getUserByTags: require("./resolver/Query/postgresql_getUserByTags")
      .func,
  },
  Mutation: {
    postgresql_createUser: require("./resolver/Mutation/postgresql_createUser")
      .func,
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
