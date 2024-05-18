const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
let cors = require("cors");

const express = require("express"); // Imports the express module
const app = express(); // Creates an Express application.
const port = 8000;

const staticPath = path.join(__dirname, "static/images");
app.use(cors());
app.use(express.json());
const connectDB = require("./database");
connectDB();
const ErrorHandler = require("./middleware/ErrorHandler");
const postRoutes = require("./post/post.routes.js");
const userRoutes = require("./user/user.routes.js");
const categoriesRoutes = require("./categories/categoriesRoutes.js");
const commentRoutes = require("./comment/commentRoutes.js");
const likeRoutes = require("./like/likeRoutes.js");
const savedRoutes = require("./saved/savedRoutes.js");

app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/comment", commentRoutes);
app.use("/like", likeRoutes);
app.use("/saved", savedRoutes);

app.use("/images", express.static(staticPath));

app.use(ErrorHandler);
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
