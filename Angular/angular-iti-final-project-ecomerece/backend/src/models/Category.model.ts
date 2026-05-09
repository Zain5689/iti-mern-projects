import mongoose from "mongoose";
import slugify from "slugify";

export interface ICategory {
  title: string;
  description: string;
  slug: string;
  image: string;
}

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      minlength: [3, "Too short product title"],
      maxlength: [32, "Too long category name"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Category description is required"],
      minlength: [20, "Too short category description"],
    },

    image: {
      type: String,
    },
    slug: { type: String, lowercase: true },
  },

  {
    timestamps: true,
  },
);

categorySchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
