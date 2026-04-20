const router = require("express").Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  res.status(201).json(await User.create(req.body));
});

router.get("/", async (req, res) => {
  res.json(await User.findAll());
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

router.put("/:id", async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});

router.delete("/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;