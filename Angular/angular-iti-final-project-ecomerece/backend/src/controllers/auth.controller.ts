import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.model";
import logger from "../utils/logger";

const signup = async (req: any, res: any, next: any) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    logger.info(`New user signed up: ${user.email}`);

    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signToken = (user: any) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN! as any,
  });
};

const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", role: "admin" },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN! as any },
      );

      return res.status(200).json({
        message: "Admin Logged in successfully",
        token,
      });
    }

    const user = (await User.findOne({ email }).select(
      "+password",
    )) as IUser | null;

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    logger.info(`User logged in: ${user.email}`);

    const token = signToken(user);

    res.status(200).json({
      status: "success",
      message: "Login successfully",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req: any, res: any, next: any) => {
  try {
    logger.info(`Profile accessed by: ${req.user.email}`);

    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(err);
  }
};

export { signup, login, getMe };
