const router = require("express").Router();
const { Comment } = require("../models");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {
  res.status(201).json(await Comment.create(req.body));
});


router.get("/", auth, async (req, res) => {
  res.json(await Comment.findAll());
});


router.get("/:id", auth, async (req, res) => {
  const c = await Comment.findByPk(req.params.id);
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});


router.put("/:id", auth, async (req, res) => {
  await Comment.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});


router.delete("/:id", auth, async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;