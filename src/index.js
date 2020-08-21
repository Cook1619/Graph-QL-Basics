import { GraphQLServer } from "graphql-yoga";

// Dummy Data
const users = [
  {
    id: "1",
    name: "Matt",
    email: "cook@example.com",
    age: 33,
  },
  {
    id: "2",
    name: "Danelle",
    email: "danelle@example.com",
  },
  {
    id: "3",
    name: "Jules",
    email: "jules@example.com",
    age: 6,
  },
];

const posts = [
  {
    id: "4",
    title: "Javascript Post",
    body: "This is a post on why JS is so awesome and unqiue",
    published: true,
    author: "1",
  },
  {
    id: "5",
    title: "CSS Post",
    body: "This is a post on why CSS is so awesome and difficult",
    published: true,
    author: "1",
  },
  {
    id: "6",
    title: "React Post",
    body: "This is a post on why React is so performant and awesome",
    published: true,
    author: "2",
  },
  {
    id: "7",
    title: "NextJS Post",
    body: "This is a post on why NextJS is so awesome and unqiue",
    published: true,
    author: "3",
  },
];

const comments = [
  {
    id: "11",
    text: "This is a comment about the React post",
    author: "1",
    post: "4",
  },
  {
    id: "12",
    text: "This is a comment about the CSS post",
    author: "2",
    post: "5",
  },
  {
    id: "13",
    text: "This is a comment about the NextJS post",
    author: "2",
    post: "6",
  },
  {
    id: "14",
    text: "This is a comment about the Javascript post",
    author: "3",
    post: "7",
  },
];

//Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }
  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
  }
  type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
  }
  type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
  }
`;

const resolvers = {
  Query: {
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
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return {
        id: "123abc",
        name: "Danelle",
        email: "danelle@example.com",
      };
    },
    post() {
      return {
        id: "092",
        title: "GraphQL 101",
        body: "",
        published: false,
      };
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, cxt, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, cxt, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, cxt, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
