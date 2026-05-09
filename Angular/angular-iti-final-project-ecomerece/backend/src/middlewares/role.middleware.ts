const roleMiddleware = (role: string[]) => {
  return (req: any, res: any, next: any) => {
    if (req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "You are not allowed to access this route" });
    }
  };
};

export default roleMiddleware;
