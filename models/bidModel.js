const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    itemid: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
    },
    name: {
      type: String,
      required:true,
    },
    price: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;
