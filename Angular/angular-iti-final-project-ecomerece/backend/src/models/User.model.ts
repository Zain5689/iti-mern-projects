import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  avatar: string;
  isActive: boolean;
  lastLogin: Date | null;
  refreshToken?: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
      maxlength: [30, "Name must be less than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
      // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
