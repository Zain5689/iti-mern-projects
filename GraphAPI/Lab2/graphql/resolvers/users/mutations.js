const User = require("../../../models/User");
const Post = require("../../../models/Post");
const Comment = require("../../../models/Comment");
const {
  generateToken,
  hashPassword,
  verifyPassword,
} = require("../../../auth");

const userMutations = {
  register: async (_, { username, email, password }) => {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user.id);
    return { token, user };
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const token = generateToken(user.id);
    return { token, user };
  },

  updateUser: async (_, { id, username, email }, context) => {
    if (!context.user) throw new Error("Authentication required");
    if (context.user.id !== id) throw new Error("Not authorized");

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    return await User.findByIdAndUpdate(id, updateData, { new: true });
  },

  deleteUser: async (_, { id }, context) => {
    if (!context.user) throw new Error("Authentication required");
    if (context.user.id !== id) throw new Error("Not authorized");

    await Post.deleteMany({ author: id });
    await Comment.deleteMany({ author: id });
    await User.findByIdAndDelete(id);
    return "User and all their data deleted successfully";
  },
};

module.exports = userMutations;
