const Post = require("../../../models/Post");

const postQueries = {
  getAllPosts: async () => {
    return await Post.find().populate("author");
  },
  getPostById: async (_, { id }) => {
    return await Post.findById(id).populate("author");
  },
  getPostsByUser: async (_, { userId }) => {
    return await Post.find({ author: userId }).populate("author");
  },
};

module.exports = postQueries;
