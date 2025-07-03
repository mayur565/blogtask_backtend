const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info("mongoDB connected");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
