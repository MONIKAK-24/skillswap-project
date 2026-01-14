const express = require("express");
const router = express.Router();

// TEST
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  res.json({
    success: true,
    message: "Signup success",
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  res.json({
    success: true,
    message: "Login success",
  });
});

module.exports = router;
