const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken.js");

//CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET POST
router.get("/:id", async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET ALL POSTS
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchPrompt = {
      title: { $regex: query.search, $options: "i" },
    };
    const allPost = await Post.find(query.search ? searchPrompt : null);
    res.status(200).json(allPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET PARTICULAR USER POSTS
router.get("/user/:userId", async (req, res) => {
  try {
    const allUserPost = await Post.find({ userId: req.params.userId });
    res.status(200).json(allUserPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
