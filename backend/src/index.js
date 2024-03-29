const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
// const User = require('./resolvers/User');
const Player = require('./resolvers/Player');

const resolvers = {
  Query,
  Mutation,
  // User,
  Player,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

const options = {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'https://twofiftysix.williambuck.dev']
  }
};

server.start(options, () => {
  console.log(`Server is running on http://localhost:4000`)
});