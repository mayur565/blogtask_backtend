const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt");
const logger = require("../utils/logger");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = generateToken(user._id);
    res
      .status(201)
      .json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};

module.exports.profile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};
