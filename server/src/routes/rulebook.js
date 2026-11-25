import { Router } from "express";
import Rulebook from "../models/Rulebook.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.get("/", async (_req, res, next) => {
  try {
    const latest = await Rulebook.findOne().sort({ version: -1 });
    res.json(latest || { version: 1, sections: [] });
  } catch (error) { next(error); }
});
router.put("/", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    if (!Array.isArray(req.body.sections)) return res.status(400).json({ message: "sections must be an array." });
    const latest = await Rulebook.findOne().sort({ version: -1 });
    const saved = await Rulebook.create({
      version: (latest?.version || 0) + 1,
      sections: req.body.sections,
      updatedBy: req.user.id
    });
    res.status(201).json(saved);
  } catch (error) { next(error); }
});
export default router;
