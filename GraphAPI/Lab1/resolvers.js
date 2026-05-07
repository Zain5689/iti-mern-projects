const { users, posts, comments } = require("./db");
const resolvers = {
  Query: {
    getAllUsers: () => users,
    getUserById: (_, { id }) => users.find((user) => user.id === id),
    getAllPosts: () => posts,
    getPostById: (_, { id }) => posts.find((post) => post.id === id),
    getAllComments: () => comments,
    getCommentById: (_, { id }) =>
      comments.find((comment) => comment.id === id),
    getPostsByUser: (_, { userId }) =>
      posts.filter((post) => post.authorId === userId),
    getUserByPost: (_, { postId }) => {
      const post = posts.find((p) => p.id === postId);
      return post ? users.find((u) => u.id === post.authorId) : null;
    },
    getCommentsByPost: (_, { postId }) =>
      comments.filter((c) => c.postId === postId),
    getPostByComment: (_, { commentId }) => {
      const comment = comments.find((c) => c.id === commentId);
      return comment ? posts.find((p) => p.id === comment.postId) : null;
    },
  },

  Mutation: {
    addUser: (_, { input }) => {
      const newUser = { id: (users.length + 1).toString(), ...input };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_, { id, input }) => {
      const user = users.find((u) => u.id === id);
      if (!user) return null;
      Object.assign(user, input);
      return user;
    },
    deleteUser: (_, { id }) => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return false;
      users.splice(index, 1);

      for (let i = posts.length - 1; i >= 0; i -= 1) {
        if (posts[i].authorId === id) {
          const deletedPostId = posts[i].id;
          posts.splice(i, 1);
          for (let j = comments.length - 1; j >= 0; j -= 1) {
            if (comments[j].postId === deletedPostId) {
              comments.splice(j, 1);
            }
          }
        }
      }

      for (let i = comments.length - 1; i >= 0; i -= 1) {
        if (comments[i].authorId === id) {
          comments.splice(i, 1);
        }
      }

      return true;
    },
    addPost: (_, { input }) => {
      const authorExists = users.some((u) => u.id === input.authorId);
      if (!authorExists) throw new Error("Author not found");
      const newPost = { id: (posts.length + 1).toString(), ...input };
      posts.push(newPost);
      return newPost;
    },
    updatePost: (_, { id, input }) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return null;
      if (input.authorId && !users.some((u) => u.id === input.authorId)) {
        throw new Error("Author not found");
      }
      Object.assign(post, input);
      return post;
    },
    deletePost: (_, { id }) => {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) return false;
      posts.splice(index, 1);
      for (let i = comments.length - 1; i >= 0; i -= 1) {
        if (comments[i].postId === id) {
          comments.splice(i, 1);
        }
      }
      return true;
    },
    addComment: (_, { input }) => {
      const authorExists = users.some((u) => u.id === input.authorId);
      const postExists = posts.some((p) => p.id === input.postId);
      if (!authorExists) throw new Error("Author not found");
      if (!postExists) throw new Error("Post not found");
      const newComment = { id: (comments.length + 1).toString(), ...input };
      comments.push(newComment);
      return newComment;
    },
    updateComment: (_, { id, input }) => {
      const comment = comments.find((c) => c.id === id);
      if (!comment) return null;
      if (input.authorId && !users.some((u) => u.id === input.authorId)) {
        throw new Error("Author not found");
      }
      if (input.postId && !posts.some((p) => p.id === input.postId)) {
        throw new Error("Post not found");
      }
      Object.assign(comment, input);
      return comment;
    },
    deleteComment: (_, { id }) => {
      const index = comments.findIndex((c) => c.id === id);
      if (index === -1) return false;
      comments.splice(index, 1);
      return true;
    },
  },

  User: {
    posts: (user) => posts.filter((post) => post.authorId === user.id),
  },
  Post: {
    author: (post) => users.find((user) => user.id === post.authorId),
    comments: (post) =>
      comments.filter((comment) => comment.postId === post.id),
  },
  Comment: {
    author: (comment) => users.find((user) => user.id === comment.authorId),
    post: (comment) => posts.find((post) => post.id === comment.postId),
  },
};

module.exports = resolvers;
