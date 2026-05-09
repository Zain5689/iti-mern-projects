const Comment = require("../../../models/Comment");

const commentQueries = {
  getAllComments: async () => {
    return await Comment.find().populate("author").populate("post");
  },
  getCommentById: async (_, { id }) => {
    return await Comment.findById(id).populate("author").populate("post");
  },
  getCommentsByPost: async (_, { postId }) => {
    return await Comment.find({ post: postId })
      .populate("author")
      .populate("post");
  },
};

module.exports = commentQueries;
