const jwt = require("jsonwebtoken");

const ProductAuth = (req, res, next) => {
  const auth = req.headers["authorization"];
  console.log("Authorization Header:", req.headers["authorization"]);

  if (!auth) {
    return res.status(403).json({ message: "Unauthorized, JWT is required" });
  }

  const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized, JWT is invalid" });
  }
};

module.exports = ProductAuth;
