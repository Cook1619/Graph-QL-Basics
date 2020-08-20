import { GraphQLServer } from "graphql-yoga";

//Type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello World!!";
    },
    name() {
      return "Hello Matt!!";
    },
    location() {
      return "Mayer, MN";
    },
    bio() {
      return "I'm a fullstack web dev from Minnesota";
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
