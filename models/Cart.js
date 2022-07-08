const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    fulfilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
