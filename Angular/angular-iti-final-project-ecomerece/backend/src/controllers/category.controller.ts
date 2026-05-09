import Category from "../models/Category.model";
import { handleImageUpload } from "../utils/processProductImages";

const add = async (req: any, res: any, next: any) => {
  try {
    await handleImageUpload(req, "image");

    const category = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req: any, res: any, next: any) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      status: "success",
      data: categories,
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

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "category not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
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
    await handleImageUpload(req, "image");

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "category not found",
      });
    }

    Object.assign(category, req.body);
    await category.save();

    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: category,
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

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteAll = async (req: any, res: any, next: any) => {
  try {
    const categories = await Category.deleteMany({});

    res.status(200).json({
      status: "success",
      message: "Categories deleted successfully",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

export { add, getAll, getById, updateById, deleteById, deleteAll };
