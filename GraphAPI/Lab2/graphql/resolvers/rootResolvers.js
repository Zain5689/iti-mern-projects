const userQueries = require("./users/queries");
const userMutations = require("./users/mutations");
const postQueries = require("./posts/queries");
const postMutations = require("./posts/mutations");
const commentQueries = require("./comments/queries");
const commentMutations = require("./comments/mutations");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

const resolvers = {
  Query: {
    ...userQueries,
    ...postQueries,
    ...commentQueries,
  },

  Mutation: {
    ...userMutations,
    ...postMutations,
    ...commentMutations,
  },

  Post: {
    comments: async (post) => {
      return await Comment.find({ post: post.id }).populate("author");
    },
  },

  Comment: {
    post: async (comment) => {
      return await Post.findById(comment.post).populate("author");
    },
  },
};

module.exports = resolvers;
