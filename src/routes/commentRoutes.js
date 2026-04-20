const router = require("express").Router();
const { Comment } = require("../models");

router.post("/", async (req, res) => {
  res.status(201).json(await Comment.create(req.body));
});

router.get("/", async (req, res) => {
  res.json(await Comment.findAll());
});

router.get("/:id", async (req, res) => {
  const c = await Comment.findByPk(req.params.id);
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});

router.put("/:id", async (req, res) => {
  await Comment.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});

router.delete("/:id", async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;