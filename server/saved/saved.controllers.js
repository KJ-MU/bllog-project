// saved.controller.js
const Saved = require("../models/SavedSchema");
exports.getSavedPost = async (req, res, next) => {
  try {
    userId = req.user.id;
    const saved = await Saved.find({ user: userId });
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};
exports.savePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const userId = req.user.id;

    // Check if the post is already saved by the user
    const existingSavedPost = await Saved.findOne({
      user: userId,
      post: postId,
    });

    if (existingSavedPost) {
      return res.status(400).json({ message: "Post already saved" });
    }

    // Create the saved post
    const savedPost = await Saved.create({ user: userId, post: postId });

    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

exports.deleteSavedPost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const userId = req.user.id;

    // Find and delete the saved post
    const deleted = await Saved.find();

    const deletedSavedPost = await Saved.findOneAndDelete({
      _id: postId,
      user: userId,
    });

    if (!deletedSavedPost) {
      return res.status(404).json({ message: "Saved post not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
