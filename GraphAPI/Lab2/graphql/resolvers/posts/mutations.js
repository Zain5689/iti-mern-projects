const Post = require("../../../models/Post");
const Comment = require("../../../models/Comment");

const postMutations = {
  addPost: async (_, { title, content }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }

    const post = new Post({
      title,
      content,
      author: context.user.id,
    });
    await post.save();
    return await Post.findById(post.id).populate("author");
  },

  updatePost: async (_, { id, title, content }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }

    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== context.user.id) {
      throw new Error("Not authorized to update this post");
    }

    const updateData = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    return await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("author");
  },

  deletePost: async (_, { id }, context) => {
    if (!context.user) {
      throw new Error("Authentication required");
    }

    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== context.user.id) {
      throw new Error("Not authorized to delete this post");
    }

    // Delete associated comments
    await Comment.deleteMany({ post: id });
    await Post.findByIdAndDelete(id);

    return true;
  },
};

module.exports = postMutations;
