const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./route/auth");
const blogRouter = require("./route/blog");
const connectDB = require("./config/dbConfig");
const logger = require("./utils/logger");
const cors = require('cors')
connectDB();

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);

app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
