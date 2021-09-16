const express = require("express");
const {
  getTransactions,
  createTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const verifyUser = require("../middleware/verifyUser");
const router = express.Router();

router
  .route("/")
  .get(verifyUser, getTransactions)
  .post(verifyUser, createTransaction);

router.delete("/:id", verifyUser, deleteTransaction);

module.exports = router;
