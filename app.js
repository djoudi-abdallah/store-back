const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT isn't set
const userRoutes = require("./router/UserRouter");
const productRoutes = require("./router/ProductRouter");
const couponRoutes = require("./router/CuponRouter");
app.use("/coupons", couponRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
