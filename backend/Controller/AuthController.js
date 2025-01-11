const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.fIndOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exsit",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "SignUp successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.fIndOne({ email });
    const errorMessage = "Authentication failed. User or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMessage, success: true });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    res.status(201).json({
      message: "Login Successfull",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signUp,
  login,
};
