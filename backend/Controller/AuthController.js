const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exsit, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password, role: "user" });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
      name: userModel.name,
      email: userModel.email,
      role: userModel.role,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed. User or message is wrong";
    if (!user) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errorMsg,
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email: user.email,
      role: user.role,
      name: user.name,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: true });
  }
};

module.exports = {
  signup,
  login,
};
