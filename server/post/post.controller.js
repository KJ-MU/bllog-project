const Post = require("../models/PostSchema");
const Categories = require("../models/CategoriesSchema");
const bcrypt = require("bcrypt");
const path = require("path");

const jwt = require("jsonwebtoken");
const fs = require("fs");
exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user").populate("categories");

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostsByCategoryId = async (req, res, next) => {
  try {
    categoryId = req.params.id;
    const posts = await Post.find({ categories: categoryId });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    // Check if the post with the same title already exists
    const existingPost = await Post.findOne({ title: req.body.title });
    if (existingPost) {
      return res.status(400).json({
        message: "There is already an existing post with this title",
      });
    }

    let newPostData = { ...req.body };

    // Check if the categories already exist
    const existingCategories = await Categories.findOne({
      tag: req.body.categories,
    });
    if (existingCategories) {
      newPostData.categories = existingCategories._id; // Use the existing category ID
    } else {
      // Create a new category if it doesn't exist
      const newCategory = await Categories.create({ tag: req.body.categories });
      newPostData.categories = newCategory._id;
    }

    // Handle image upload
    const imageFile = req.file;
    const imageUrl = "images/" + imageFile.filename;
    newPostData.image = imageUrl;

    // Set the user ID
    newPostData.user = req.user.userId;

    // Create the new post
    const newPost = await Post.create(newPostData);

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const imagePath = path.join(__dirname, "..", "static", deletedPost.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.warn(`Image file not found at path: ${imagePath}`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    // Check if the post with the specified ID exists
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the title is being updated and if it conflicts with existing titles
    if (req.body.title && req.body.title !== existingPost.title) {
      const existingPostWithTitle = await Post.findOne({
        title: req.body.title,
      });
      if (existingPostWithTitle) {
        return res
          .status(400)
          .json({ message: "A post with this title already exists" });
      }
    }

    let updatedPostData = { ...req.body };

    // Check if the categories are being updated
    if (req.body.categories) {
      const existingCategories = await Categories.findOne({
        tag: req.body.categories,
      });
      if (existingCategories) {
        updatedPostData.categories = existingCategories._id; // Use the existing category ID
      } else {
        // Create a new category if it doesn't exist
        const newCategory = await Categories.create({
          tag: req.body.categories,
        });
        updatedPostData.categories = newCategory._id;
      }
    }

    // Handle image upload if there's a new image
    if (req.file) {
      const imageUrl = "images/" + req.file.filename;
      updatedPostData.image = imageUrl;
    }
    // **Delete the old image from the database**
    const imagePath = path.join(__dirname, "..", "static", existingPost.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.warn(`Image file not found at path: ${imagePath}`);
    }
    // Set the user ID
    updatedPostData.user = req.user.userId;

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedPostData,
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.searchPost = async (req, res, next) => {
  try {
    const word = req.params.word;

    // Search for posts with titles containing the specified word
    const searchedPosts = await Post.find({
      title: { $regex: word, $options: "i" }, // Case-insensitive regex search
    });

    res.json(searchedPosts);
  } catch (error) {
    next(error);
  }
};
