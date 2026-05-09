import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoute from "./routes/auth.route";
import productsRoute from "./routes/product.route";
import usersRoute from "./routes/user.route";
import categoriesRoute from "./routes/category.route";
import cartRoute from "./routes/cart.route";
import ordersRoute from "./routes/order.route";

dotenv.config();
connectDB();
const corsConfig = {
  origin: [
    "http://localhost:4200",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:63735",
    "http://localhost:188.51.233.4",
    "https://angular-iti-final-project-ecomerece.vercel.app",
  ],
};

const app = express();
app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", ordersRoute);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`);
});
