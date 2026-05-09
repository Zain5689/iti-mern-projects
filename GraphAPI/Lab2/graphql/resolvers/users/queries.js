const User = require("../../../models/User");

const userQueries = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (_, { id }) => {
    return await User.findById(id);
  },
  me: async (_, __, context) => {
    return context.user;
  },
};

module.exports = userQueries;
