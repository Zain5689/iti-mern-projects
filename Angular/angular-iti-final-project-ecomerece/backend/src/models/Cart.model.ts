import mongoose from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  color?: string;
  price: number;
}

export interface ICart {
  cartItems: ICartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  user: mongoose.Types.ObjectId;
}

const cartSchema = new mongoose.Schema<ICart>(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product is required in cart"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: { type: Number, required: true },
      },
    ],
    totalCartPrice: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
      unique: true,
    },
  },
  { timestamps: true },
);

cartSchema.pre("save", function () {
  this.totalCartPrice = this.cartItems.reduce((total, item) => {
    return total + item.quantity * item.price!;
  }, 0);
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
