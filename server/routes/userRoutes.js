const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken.js");

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("user has been deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET USER
router.get("/:id", async (req, res) => {
  try {
    const getUser = await user.findById(req.params.id);
    const { password, ...info } = getUser._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
