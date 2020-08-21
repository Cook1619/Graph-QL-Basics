import { GraphQLServer } from "graphql-yoga";

//Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String): String!
    add(number1: Float!, number2: Float!): Float!
    me: User!
    post: Post!
  }
  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
  }
  type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: "abc123",
        name: "Matt",
        email: "cook@example.com",
      };
    },
    post() {
      return {
        id: "123nbc",
        title: "This is a post title",
        body:
          "This is the body of the post which has more words than the title",
        published: true,
      };
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`;
      }
      return `No name provided`;
    },
    add(parent, args, ctx, info) {
      return args.number1 + args.number2;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
