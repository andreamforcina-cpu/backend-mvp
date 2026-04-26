const router = require("express").Router();
const { Comment } = require("../models");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  res.status(201).json(await Comment.create(req.body));
});

// GET ALL
router.get("/", auth, async (req, res) => {
  res.json(await Comment.findAll());
});

// GET ONE
router.get("/:id", auth, async (req, res) => {
  const c = await Comment.findByPk(req.params.id);
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  await Comment.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;