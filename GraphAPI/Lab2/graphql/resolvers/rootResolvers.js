const userQueries = require("./users/queries");
const userMutations = require("./users/mutations");
const postQueries = require("./posts/queries");
const postMutations = require("./posts/mutations");
const commentQueries = require("./comments/queries");
const commentMutations = require("./comments/mutations");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User");

const resolvers = {
  Query: { ...userQueries, ...postQueries, ...commentQueries },
  Mutation: { ...userMutations, ...postMutations, ...commentMutations },
  Post: {
    author: async (post) => await User.findById(post.author),
    comments: async (post) =>
      await Comment.find({ post: post.id }).populate("author"),
  },
  Comment: {
    author: async (comment) => await User.findById(comment.author),
    post: async (comment) =>
      await Post.findById(comment.post).populate("author"),
  },
};

module.exports = resolvers;
