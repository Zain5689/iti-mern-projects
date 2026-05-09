const Comment = require("../../../models/Comment");
const Post = require("../../../models/Post");

const commentMutations = {
  addComment: async (_, { postId, content }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const comment = new Comment({
      content,
      author: context.user.id,
      post: postId,
    });
    await comment.save();
    return await Comment.findById(comment.id)
      .populate("author")
      .populate("post");
  },

  updateComment: async (_, { id, content }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== context.user.id) {
      throw new Error("Not authorized to update this comment");
    }

    const updateData = { content, updatedAt: new Date() };
    return await Comment.findByIdAndUpdate(id, updateData, { new: true })
      .populate("author")
      .populate("post");
  },

  deleteComment: async (_, { id }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }

    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== context.user.id) {
      throw new Error("Not authorized to delete this comment");
    }

    await Comment.findByIdAndDelete(id);
    return true;
  },
};

module.exports = commentMutations;
