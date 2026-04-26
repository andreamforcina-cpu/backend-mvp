const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const SECRET = process.env.JWT_SECRET;


router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, 
      role: req.body.role || "user" 
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role 
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;