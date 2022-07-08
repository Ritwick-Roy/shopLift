const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    transaction: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    authorization: JSON,
    shippingAddress: JSON,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
