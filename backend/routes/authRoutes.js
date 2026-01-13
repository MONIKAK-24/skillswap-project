const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

// Updated route paths
router.post("/register", signup); // /api/register
router.post("/login", login);     // /api/login

module.exports = router;
