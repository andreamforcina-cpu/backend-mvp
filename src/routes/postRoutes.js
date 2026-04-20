const router = require("express").Router();
const { Post } = require("../models");

router.post("/", async (req, res) => {
  res.status(201).json(await Post.create(req.body));
});

router.get("/", async (req, res) => {
  res.json(await Post.findAll());
});

router.get("/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

router.put("/:id", async (req, res) => {
  await Post.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});

router.delete("/:id", async (req, res) => {
  await Post.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;