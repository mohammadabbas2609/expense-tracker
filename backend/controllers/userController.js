const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../middleware/generateToken");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");

//@desc     Register User
//@route    POST /api/user/register
//@access   Public
const registerUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);

  const token = generateToken(user._id);

  res.status(200).json({
    email: user.email,
    createdAt: user.createdAt,
    token,
  });
});

//@desc     Login User
//@route    POST /api/user/login
//@access   Public
const loginUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "user not found with this email",
    });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.status(401).json({
      message: "Please enter correct password",
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    email: user.email,
    createdAt: user.createdAt,
    token,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
