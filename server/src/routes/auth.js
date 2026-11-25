import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const publicUser = (user) => ({
  id: user._id, name: user.name, gamertag: user.gamertag, email: user.email,
  role: user.role, primaryGame: user.primaryGame, region: user.region
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, gamertag, email, password, primaryGame, region } = req.body;
    if (!name || !gamertag || !email || !password || password.length < 10) {
      return res.status(400).json({ message: "Name, gamertag, email and a password of at least 10 characters are required." });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ message: "Email is already registered." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, gamertag, email: normalizedEmail, passwordHash, primaryGame, region });
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(String(req.body.password || ""), user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
    res.json({ token, user: publicUser(user) });
  } catch (error) { next(error); }
});

router.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
export default router;
