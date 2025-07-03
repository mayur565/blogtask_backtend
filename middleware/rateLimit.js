const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: "Too many login attempts. Try again in 5 minutes.",
  },
});

module.exports = loginLimiter;
