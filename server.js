require("dotenv").config();
const app = require("./app");
const logger = require("./utils/logger");

app.listen(process.env.PORT || 8000, () => {
  logger.info(`server is running on port ${process.env.PORT}`)
});
