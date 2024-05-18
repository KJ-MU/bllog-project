module.exports = (error, req, res, next) => {
  // Handle the error
  console.log("Executing error handling middleware");
  res.status(500).json({ message: error.message || "Internal server error" });
};
