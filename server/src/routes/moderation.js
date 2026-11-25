import { Router } from "express";
import CheatReport from "../models/CheatReport.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireAdmin);

// Admin-only incident queue. Reports are allegations requiring human review.
router.get("/cheat-reports", async (req, res, next) => {
  try {
    const reports = await CheatReport.find()
      .populate("createdBy", "name gamertag")
      .populate("reviewedBy", "name gamertag")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) { next(error); }
});

router.post("/cheat-reports", async (req, res, next) => {
  try {
    const { player, game, category, severity, description, evidence } = req.body;
    if (!player || !game || !category || !description) {
      return res.status(400).json({ message: "Player, game, category and description are required." });
    }
    const report = await CheatReport.create({
      player, game, category, severity, description, evidence, createdBy: req.user.id
    });
    res.status(201).json(report);
  } catch (error) { next(error); }
});

router.patch("/cheat-reports/:id", async (req, res, next) => {
  try {
    const { status, resolution } = req.body;
    const allowed = ["Pending Review", "Under Review", "Resolved", "Dismissed"];
    if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid report status." });
    if (["Resolved", "Dismissed"].includes(status) && !String(resolution || "").trim()) {
      return res.status(400).json({ message: "Resolution notes are required." });
    }
    const report = await CheatReport.findByIdAndUpdate(req.params.id, {
      status, resolution: String(resolution || ""), reviewedBy: req.user.id, reviewedAt: new Date()
    }, { new: true, runValidators: true });
    if (!report) return res.status(404).json({ message: "Incident report not found." });
    res.json(report);
  } catch (error) { next(error); }
});

export default router;
