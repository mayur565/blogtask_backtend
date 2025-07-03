const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/auth");
const { createBlogValidation } = require("../validation/blogValidation");
const {
  create,
  get,
  getById,
  update,
  deleteBlog,
} = require("../controller/blog");
// const validate = require("../middleware/validate");
const { validationResult } = require("express-validator");


router.post("/", authenticate, createBlogValidation, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", errors: errors.array() });
  }

  create(req, res);
});

router.get("/", get);
router.get("/:id", getById);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, deleteBlog);

module.exports = router;
