const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Please login to continue",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.userId;
    return next();
  } catch {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
};

module.exports = verifyUser;
