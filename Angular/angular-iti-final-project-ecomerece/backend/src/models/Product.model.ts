import mongoose from "mongoose";
import slugify from "slugify";

export interface IProduct {
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: mongoose.Types.ObjectId;
  ratingsAverage?: number;
  ratingsQuantity?: number;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Too short product title"],
    },

    slug: { type: String, lowercase: true },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short product description"],
    },

    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: { type: Number },
    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: { type: Number, default: 0 },
  },

  {
    timestamps: true,
  },
);

productSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
