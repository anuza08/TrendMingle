const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../Models/Admin");

const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.status(409).json({
        message: "Admin already exists. Please log in.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({ name, email, password: hashedPassword });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin registered successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    const errorMsg = "Authentication failed. Invalid email or password.";

    if (!admin) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: admin.email, _id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Admin login successful",
      success: true,
      jwtToken,
      email,
      name: admin.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  adminSignup,
  adminLogin,
};
