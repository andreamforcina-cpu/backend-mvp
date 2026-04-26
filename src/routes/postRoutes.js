const router = require("express").Router();
const { Post } = require("../models");
const auth = require("../middleware/auth");
const role = require("../middleware/role");


router.post("/", auth, async (req, res) => {
  const post = await Post.create({
    ...req.body,
    userId: req.user.id // 🔥 IMPORTANT (ownership)
  });

  res.status(201).json(post);
});


router.get("/", auth, async (req, res) => {
  res.json(await Post.findAll());
});


router.get("/:id", auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) return res.status(404).json({ error: "Not found" });

  res.json(post);
});


router.put("/:id", auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) return res.status(404).json({ error: "Not found" });

  
  if (req.user.id !== post.userId && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  await post.update(req.body);
  res.json({ message: "updated" });
});


router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);

  if (!post) return res.status(404).json({ error: "Not found" });

  if (req.user.id !== post.userId && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  await post.destroy();
  res.json({ message: "deleted" });
});

module.exports = router;