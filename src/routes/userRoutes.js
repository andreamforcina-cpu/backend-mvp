const router = require("express").Router();
const { User } = require("../models");
const auth = require("../middleware/auth");
const role = require("../middleware/role");


router.post("/", async (req, res) => {
  res.status(201).json(await User.create(req.body));
});


router.get("/", auth, role("admin"), async (req, res) => {
  res.json(await User.findAll());
});


router.get("/:id", auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).json({ error: "Not found" });

  
  if (req.user.id != req.params.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  res.json(user);
});


router.put("/:id", auth, async (req, res) => {
  if (req.user.id != req.params.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  await User.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "updated" });
});


router.delete("/:id", auth, role("admin"), async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "deleted" });
});

module.exports = router;