// like.controller.js
const Like = require("../models/LikeSchema");
const Post = require("../models/PostSchema");

exports.getLikesByPostId = async (req, res, next) => {
  try {
    const PostId = req.params.id;
    const likes = await Like.find({ post: PostId }).populate("user");
    res.status(201).json(likes);
  } catch (error) {
    next(error);
  }
};

exports.addLike = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const userId = req.user.userId;

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    // Create the like and increment the count
    // const like = await Like.create({ post: postId, user: userId });
    // await like.updateOne({ $inc: { count: 1 } });

    // res.status(201).json(like);
    // Create the like
    const like = new Like({ user: userId, post: postId });
    await like.save();

    // Increment the post's like count
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    const LikeId = req.params.likeId;

    // Find the like by id
    const like = await Like.findById(LikeId);

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    // // Decrement the count and delete the like
    // await like.updateOne({ $inc: { count: -1 } });
    // await like.delete();

    // res.status(204).end();
    const postId = like.post;
    await Like.findByIdAndDelete(LikeId);

    // Decrement the post's like count
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
