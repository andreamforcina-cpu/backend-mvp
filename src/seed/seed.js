const { sequelize, User, Post, Comment } = require("../models");

async function seed() {
  await sequelize.sync({ force: true });

  const user = await User.create({
    name: "Andrea",
    email: "test@test.com"
  });

  const post = await Post.create({
    title: "Hello",
    content: "First post",
    UserId: user.id
  });

  await Comment.create({
    text: "Nice!",
    PostId: post.id
  });

  console.log("Seed complete");
  process.exit();
}

seed();