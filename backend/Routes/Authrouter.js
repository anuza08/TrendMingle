const { login, signUp } = require("../Controller/AuthController");
const {
  loginValidation,
  SignUpValidation,
} = require("../Middleware/AuthValidation");

const router = require("express").Router();
router.post("/login", loginValidation, login);
router.post("/signup", SignUpValidation, signUp);

module.exports = router;
