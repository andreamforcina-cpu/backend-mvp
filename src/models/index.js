const sequelize = require("../config/database");

const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User);

Post.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Post);

module.exports = { sequelize, User, Post, Comment };