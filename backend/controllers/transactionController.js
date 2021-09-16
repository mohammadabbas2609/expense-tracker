const asyncHandler = require("../middleware/asyncHandler");
const TransactionModel = require("../model/TransactionModel");

//@desc     Get all the transaction of user
//@route    GET /api/transactions
//@access   Private
const getTransactions = asyncHandler(async (req, res, next) => {
  const transaction = await TransactionModel.find({ user: req.user });

  res.status(200).json({
    transaction,
  });
});

//@desc     Create transaction
//@route    POST /api/transactions
//@access   Private
const createTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await TransactionModel.create({
    ...req.body,
    user: req.user,
  });

  res.status(200).json({
    transaction,
  });
});

//@desc     delete transaction
//@route    DELETE /api/transactions/:id
//@access   Private
const deleteTransaction = asyncHandler(async (req, res, next) => {
  try {
    await TransactionModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      transaction: "deleted",
    });
  } catch {
    res.status(400).json({
      error: "transaction not found",
    });
  }
});

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
};
