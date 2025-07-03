const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controller/auth");
const { authenticate } = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");
const { validationResult } = require("express-validator");
const loginLimiter = require("../middleware/rateLimit");
router.post("/register", registerValidation, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", errors: errors.array() });
  }

  register(req, res);
});

router.post("/login", loginLimiter, loginValidation, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", errors: errors.array() });
  }

  login(req, res);
});

router.post("/profile", authenticate, profile);

router.get("/check-helth", (req, res) => {
  res.send("server is running")
});

module.exports = router;
