const jwt = require("jsonwebtoken");

const ProductAuth = (req, res, next) => {
  const auth = req.header["authorization"];
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized, JWT is required" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized, JWT is required" });
  }
};

module.exports = ProductAuth;
