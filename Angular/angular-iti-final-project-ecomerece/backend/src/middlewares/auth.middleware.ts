import jwt from "jsonwebtoken";
import User from "../models/User.model";

interface IDecodedToken {
  id: string;
}

export const authenticate = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "no token provider" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken;

    if (decode.id === "admin") {
      req.user = {
        _id: "admin",
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      };
      return next();
    }

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
