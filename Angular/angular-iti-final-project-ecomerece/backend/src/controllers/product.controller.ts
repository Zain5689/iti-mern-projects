import Product from "../models/Product.model";
import { handleImageUpload } from "../utils/processProductImages";

const add = async (req: any, res: any, next: any) => {
  try {
    await handleImageUpload(req, "imageCover");

    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: any, res: any, next: any) => {
  try {
    const products = await Product.find({}).populate({
      path: "category",
      select: "title",
    });

    res.status(200).json({
      status: "success",
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id is required",
      });
    }

    const product = await Product.findById(id).populate({
      path: "category",
      select: "title",
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

const updateById = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id is required",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }

    await handleImageUpload(req, "imageCover");

    Object.assign(product, req.body);
    await product.save();

    await product.populate({
      path: "category",
      select: "title",
    });

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req: any, res: any, next: any) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "id is required",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (req: any, res: any, next: any) => {
  try {
    const products = await Product.deleteMany({});

    res.status(200).json({
      status: "success",
      message: "Products deleted successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

export { add, getAll, getById, updateById, deleteById, deleteAll };
