import { Router } from "express";
import Team from "../models/Team.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.get("/", async (_req, res, next) => {
  try { res.json(await Team.find().populate("captain", "gamertag name").populate("members", "gamertag name")); }
  catch (error) { next(error); }
});
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { name, tag, game, description } = req.body;
    if (!name || !tag || !game) return res.status(400).json({ message: "Team name, tag and game are required." });
    const team = await Team.create({ name, tag, game, description, captain: req.user.id, members: [req.user.id] });
    res.status(201).json(team);
  } catch (error) { next(error); }
});
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found." });
    if (String(team.captain) !== String(req.user.id) && req.user.role !== "admin") return res.status(403).json({ message: "Only the captain or an administrator can delete this team." });
    await team.deleteOne(); res.json({ message: "Team deleted." });
  } catch (error) { next(error); }
});

router.patch("/:id/ban", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const reason = String(req.body.reason || "").trim();
    if (!reason) return res.status(400).json({ message: "A ban reason is required." });
    const team = await Team.findByIdAndUpdate(req.params.id, {
      isBanned: true, banReason: reason, bannedAt: new Date(), bannedBy: req.user.id
    }, { new: true, runValidators: true });
    if (!team) return res.status(404).json({ message: "Team not found." });
    res.json({ message: "Team banned.", team });
  } catch (error) { next(error); }
});

router.patch("/:id/unban", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, {
      isBanned: false, unbannedAt: new Date(), unbannedBy: req.user.id
    }, { new: true, runValidators: true });
    if (!team) return res.status(404).json({ message: "Team not found." });
    res.json({ message: "Team unbanned.", team });
  } catch (error) { next(error); }
});

export default router;
