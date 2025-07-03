const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const logDir = path.join(__dirname, "../logs");

const loggerTransports = [new transports.Console()];

if (!isProd) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  loggerTransports.push(
    new transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new transports.File({ filename: path.join(logDir, "combined.log") })
  );
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: loggerTransports,
});

module.exports = logger;
