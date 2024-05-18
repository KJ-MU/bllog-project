const Categories = require("../models/CategoriesSchema");

exports.addCategory = async (req, res, next) => {
  try {
    const tag = { ...req.body };

    const newCategory = await Categories.create(tag);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
