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
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("comment has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET POSTS COMMENT
router.get("/post/:postId", async (req, res) => {
  try {
    const allPostComments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(allPostComments);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
