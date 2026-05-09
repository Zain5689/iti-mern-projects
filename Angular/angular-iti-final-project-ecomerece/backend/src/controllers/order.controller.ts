import Cart from "../models/Cart.model";
import Order from "../models/Order.model";

const create = async (req: any, res: any, next: any) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const order = await Order.create({
      user: req.user._id,
      orderItems: cart.cartItems,
      totalPrice: cart.totalCartPrice,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
    });

    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req: any, res: any, next: any) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");

    res.status(200).json({
      status: "success",
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: any, res: any, next: any) => {
  try {
    const orders = await Order.find()
      .sort("-createdAt")
      .populate("user", "name email");

    res.status(200).json({
      status: "success",
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

const cancel = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order status updated to cancelled",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

export { create, getMyOrders, getAll, cancel };
