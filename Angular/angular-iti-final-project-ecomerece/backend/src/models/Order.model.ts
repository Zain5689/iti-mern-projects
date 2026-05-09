import mongoose from "mongoose";

export interface IOrder {
  user: mongoose.Types.ObjectId;
  orderItems: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    city: string;
    street: string;
    phone: string;
  };
  totalPrice: number;
  paymentMethod: string;
  status: string;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
