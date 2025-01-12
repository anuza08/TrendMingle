// const { signup, login } = require("../Controllers/AuthController");
// const {
//   signupValidation,
//   loginValidation,
// } = require("../Middleware/AuthValidation");

// const { sign } = require("jsonwebtoken");
const { login, signup } = require("../Controller/AuthController");
const {
  loginValidation,
  signupValidation,
} = require("../Middleware/AuthValidation");

const router = require("express").Router();

// router.post("/login", loginValidation, login);
router.post("/login", loginValidation, login);
// router.post("/signup", signupValidation, signup);
router.post("/signup", signupValidation, signup);
// router.get("/products", productAuth);
module.exports = router;
