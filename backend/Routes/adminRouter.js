const express = require("express");
const { adminSignup, adminLogin } = require("../Controller/AdminAuth");
const verifyAdminToken = require("../Middleware/AdminValidation");
const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.get("/protected-route", verifyAdminToken, (req, res) => {
  res.status(200).json({ message: "Admin access granted", success: true });
});

module.exports = router;
