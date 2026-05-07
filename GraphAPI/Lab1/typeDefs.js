const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  input AddUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  input AddPostInput {
    title: String!
    content: String!
    authorId: ID!
  }

  input UpdatePostInput {
    title: String
    content: String
    authorId: ID
  }

  input AddCommentInput {
    content: String!
    postId: ID!
    authorId: ID!
  }

  input UpdateCommentInput {
    content: String
    postId: ID
    authorId: ID
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post
    getAllComments: [Comment!]!
    getCommentById(id: ID!): Comment
    // getPostsByUser(userId: ID!): [Post!]!
    // getUserByPost(postId: ID!): User
    // getCommentsByPost(postId: ID!): [Comment!]!
    // getPostByComment(commentId: ID!): Post
  }

  type Mutation {
    addUser(input: AddUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!
    addPost(input: AddPostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post
    deletePost(id: ID!): Boolean!
    addComment(input: AddCommentInput!): Comment!
    updateComment(id: ID!, input: UpdateCommentInput!): Comment
    deleteComment(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
