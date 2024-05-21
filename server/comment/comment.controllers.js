// comment.controller.js
const Comment = require("../models/CommentSchema");

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const PostId = req.params.id;
    const comments = await Comment.find({ post: PostId }).populate("user");
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
};
exports.createComment = async (req, res, next) => {
  try {
    const PostId = req.params.id;
    const { text } = req.body;
    const user = req.user.userId;
    const comment = await Comment.create({ text, user, post: PostId });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
