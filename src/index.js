import { GraphQLServer } from "graphql-yoga";

//Type definitions (schema)
const typeDefs = `
  type Query {
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
      };
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
