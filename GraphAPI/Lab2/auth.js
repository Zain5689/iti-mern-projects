const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const getUserFromContext = async ({ req }) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
      return { id: decoded.id };
    } catch (e) {
      return null;
    }
  }
  return null;
};

module.exports = {
  hashPassword: (pw) => bcrypt.hash(pw, 10),
  verifyPassword: (pw, hash) => bcrypt.compare(pw, hash),
  generateToken: (id) => jwt.sign({ id }, SECRET, { expiresIn: "1d" }),
  getUserFromContext,
  SECRET,
};
