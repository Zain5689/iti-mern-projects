import User from "../models/User.model";

const getAll = async (req: any, res: any, next: any) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      count: users.length,
      data: users,
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

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { getAll, deleteById };
