const { body } = require("express-validator");

module.exports.createBlogValidation = [
  body("title").notEmpty().withMessage("title is required"),
  body("content").notEmpty().withMessage("content is required"),
  body("category").notEmpty().withMessage("category is required"),
  body("tags").notEmpty().withMessage("tags is required"),
]