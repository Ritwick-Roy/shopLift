const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const Bid=require("./models/bidModel");
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

app.post("/api/createbid",async(req,res)=>{
  const {itemid,name,price} = req.body;
  const newBid = new Bid({itemid,name,price});
  const bid = await newBid.save();
  io.sockets.emit("message received", {itemid,name,price});
  res.json({itemid,name,price,bid});
});

app.get("/api/leaderboard",async(req,res)=>{
  const bid = await Bid.find().sort({price:-1,createdAt:1});
  res.json(bid);
});

app.get("/", (req, res) => {
  res.send("Default route up!");
});

const server = app.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  console.log(socket.id);

  socket.on("new message", (newMessageRecieved) => {
    console.log("new message");
    console.log(newMessageRecieved);
    socket.broadcast.emit("message received", newMessageRecieved);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
