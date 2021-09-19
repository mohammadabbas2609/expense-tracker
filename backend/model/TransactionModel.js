const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please enter text of transaction"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const TransactionModel = new mongoose.model("transaction", TransactionSchema);

module.exports = TransactionModel;
