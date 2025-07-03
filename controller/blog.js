const Blog = require("../models/blogSchema");
const logger = require("../utils/logger");

module.exports.create = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blog = await Blog.create({
      title,
      content,
      category,
      tags,
      author: req.user._id,
    });
    res.status(201).json(blog);
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};

module.exports.get = async (req, res) => {
  try {
    const blogs = await Blog.find().select("title category tags content auther").populate("author", "name email");
    console.log(blogs)
    res.json(blogs);
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { title, category } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    await blog.save();
    res.json(blog);
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    if (blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });
    await Blog.deleteOne({ _id: req.params.id });

    res.json({ message: "Deleted" });
  } catch (error) {
    logger.error(error || "Server Error");
    res.status(500).json({
      error: error || "Server Error",
    });
  }
};
