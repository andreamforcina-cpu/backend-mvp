const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ ADD THIS

app.use(express.json());
app.use(logger);

app.use("/auth", authRoutes); // ✅ ADD THIS
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use(errorHandler);

module.exports = app;