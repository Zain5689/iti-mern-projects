const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    # User queries
    getAllUsers: [User!]!
    getUserById(id: ID!): User

    # Post queries
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post

    # Comment queries
    getAllComments: [Comment!]!
    getCommentById(id: ID!): Comment

    # Relationship queries
    getPostsByUser(userId: ID!): [Post!]!
    getCommentsByPost(postId: ID!): [Comment!]!

    # Auth query
    me: User
  }

  type Mutation {
    # Auth mutations
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    # User mutations
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): Boolean!

    # Post mutations
    addPost(title: String!, content: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Boolean!

    # Comment mutations
    addComment(postId: ID!, content: String!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
