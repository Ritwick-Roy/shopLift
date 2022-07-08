const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;
const userApiRoutes = require("./routes/userApi");
const productsApiRoutes = require("./routes/productsApi");
const authApiRoutes = require("./routes/authApi");
const profileApiRoutes = require("./routes/profileApi");
const cartApiRoutes = require("./routes/cartApi");
const paymentApiRoutes = require("./routes/paymentApi");

app.use(morgan("dev"));

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/users", userApiRoutes);
app.use("/api/products", productsApiRoutes);
app.use("/api/auth", authApiRoutes);
app.use("/api/profile", profileApiRoutes);
app.use("/api/cart", cartApiRoutes);
app.use("/api/payment", paymentApiRoutes);

app.get("/", (req, res) => {
  res.send("Default route up!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
