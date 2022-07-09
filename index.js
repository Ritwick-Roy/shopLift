const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Bid=require("./models/bidModel");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.get("/api", (req, res) => {
  res.json({ message: "hello" });
});

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

const server = app.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
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
