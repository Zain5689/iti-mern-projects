import Cart from "../models/Cart.model";
import Product from "../models/Product.model";

const add = async (req: any, res: any, next: any) => {
  const { productId } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [
          {
            product: product._id,
            quantity: 1,
            price: product.price,
          },
        ],
      });
    } else {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === product._id.toString(),
      );

      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity++;
      } else {
        cart.cartItems.push({
          product: product._id,
          price: product.price,
          quantity: 1,
        });
      }
    }

    await cart.save();

    const populated = await cart.populate(
      "cartItems.product",
      "title imageCover price quantity",
    );

    res.status(201).json({
      status: "success",
      data: populated,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: any, res: any, next: any) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product",
      "title imageCover price quantity",
    );

    if (!cart) {
      return res.status(404).json({
        message: "You have no cart",
      });
    }

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id is required",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: "You have no cart",
      });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === id.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    cart.cartItems[itemIndex].quantity = req.body.quantity;

    await cart.save();

    const populated = await cart.populate(
      "cartItems.product",
      "title imageCover price quantity",
    );

    res.status(200).json({
      status: "success",
      message: "Item updated",
      data: populated,
    });
  } catch (err) {
    next(err);
  }
};

const removeItem = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      {
        user: req.user._id,
      },
      { $pull: { cartItems: { product: id } } },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    await cart.populate("cartItems.product", "title imageCover price quantity");

    res.status(200).json({
      status: "success",
      message: "Item removed",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

const clear = async (req: any, res: any, next: any) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        cartItems: [],
        totalCartPrice: 0,
      },
      {
        new: true,
      },
    );

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Cart items cleared successfully",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};

export { add, getAll, update, removeItem, clear };
