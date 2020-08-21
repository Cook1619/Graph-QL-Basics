import { GraphQLServer } from "graphql-yoga";

// Dummy Data
const users = [
  {
    id: 1,
    name: "Matt",
    email: "cook@example.com",
    age: 33,
  },
  {
    id: 2,
    name: "Danelle",
    email: "danelle@example.com",
  },
  {
    id: 3,
    name: "Jules",
    email: "jules@example.com",
    age: 6,
  },
];

const posts = [
  {
    id: 1,
    title: "Javascript Post",
    body: "This is a post on why JS is so awesome and unqiue",
    published: true,
  },
  {
    id: 2,
    title: "CSS Post",
    body: "This is a post on why CSS is so awesome and difficult",
    published: true,
  },
  {
    id: 3,
    title: "React Post",
    body: "This is a post on why React is so performant and awesome",
    published: true,
  },
  {
    id: 4,
    title: "NextJS Post",
    body: "This is a post on why NextJS is so awesome and unqiue",
    published: true,
  },
];

//Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
