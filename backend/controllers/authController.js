const User = require("../models/User");  // import User model
const bcrypt = require("bcryptjs");      // for password hashing
const jwt = require("jsonwebtoken");     // for JWT tokens

// --------- REGISTER USER ---------
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------- LOGIN USER ---------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
