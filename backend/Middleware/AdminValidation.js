const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided.", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Not an admin.", success: false });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token.", success: false });
  }
};

module.exports = verifyAdminToken;
