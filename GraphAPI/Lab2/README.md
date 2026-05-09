# GraphQL API - Lab 2

A GraphQL API for managing Users, Posts, and Comments with authentication and MongoDB integration.

## Features

- **User Management**: Register, login, update profile, delete account
- **Post Management**: Create, read, update, delete posts
- **Comment Management**: Add, read, update, delete comments on posts
- **Authentication**: JWT-based authentication for secure operations
- **Relationships**: Users can create posts, posts can have comments
- **Authorization**: Users can only modify their own content

## Tech Stack

- **Node.js** with Express
- **GraphQL** with Apollo Server
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:

   ```
   MONGODB_URI=mongodb://localhost:27017/graphql_lab2
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=4000
   ```

3. Start MongoDB service

4. Run the server:

   ```bash
   npm start
   ```

5. Access GraphQL Playground at `http://localhost:4000/graphql`

## GraphQL Schema

### Types

```graphql
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
```

### Queries

```graphql
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
```

### Mutations

```graphql
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
```

## Usage Examples

### Register a new user

```graphql
mutation {
  register(
    username: "john_doe"
    email: "john@example.com"
    password: "password123"
  ) {
    token
    user {
      id
      username
      email
    }
  }
}
```

### Login

```graphql
mutation {
  login(email: "john@example.com", password: "password123") {
    token
    user {
      id
      username
    }
  }
}
```

### Create a post (requires authentication)

```graphql
mutation {
  addPost(title: "My First Post", content: "This is the content of my post") {
    id
    title
    content
    author {
      username
    }
    createdAt
  }
}
```

### Get all posts with comments

```graphql
query {
  getAllPosts {
    id
    title
    content
    author {
      username
    }
    comments {
      id
      content
      author {
        username
      }
    }
    createdAt
  }
}
```

### Add a comment to a post

```graphql
mutation {
  addComment(postId: "post_id_here", content: "This is my comment") {
    id
    content
    author {
      username
    }
    post {
      title
    }
    createdAt
  }
}
```

## Authentication

Include the JWT token in the `Authorization` header for authenticated requests:

```
Authorization: Bearer your_jwt_token_here
```

## Project Structure

```
Lab2/
├── app.js                 # Main application entry point
├── auth.js                # Authentication utilities
├── db.connection.js       # MongoDB connection
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── models/                # Mongoose models
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
└── graphql/
    ├── schema.js         # GraphQL type definitions
    └── resolvers/        # GraphQL resolvers
        ├── rootResolvers.js
        ├── users/
        │   ├── queries.js
        │   └── mutations.js
        ├── posts/
        │   ├── queries.js
        │   └── mutations.js
        └── comments/
            ├── queries.js
            └── mutations.js
```

## Notes

- All mutations that modify data require authentication
- Users can only modify their own posts and comments
- Deleting a user also deletes all their posts and comments
- Deleting a post also deletes all associated comments
- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
