const express = require("express");
require("dotenv").config({});
const connectDB = require("./config/connectDB");
const cors = require("cors");
const transactionRoute = require("./routes/TransactionRoute");
const userRoute = require("./routes/userRoutes");

const app = express();
app.use(
  cors({
    origin: "https://track-your-expenses2609.netlify.app",
  })
);
app.use(express.json());

// Using Routes
app.use("/api/transactions", transactionRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
