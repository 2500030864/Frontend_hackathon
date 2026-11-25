import { Router } from "express";
import Tournament from "../models/Tournament.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.game) filter.game = new RegExp(String(req.query.game), "i");
    if (req.query.status) filter.status = req.query.status;
    res.json(await Tournament.find(filter).sort({ tournamentDate: 1 }));
  } catch (error) { next(error); }
});
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Tournament.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Tournament not found." });
    res.json(item);
  } catch (error) { next(error); }
});
router.post("/", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Tournament.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(item);
  } catch (error) { next(error); }
});
router.patch("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Tournament not found." });
    res.json(item);
  } catch (error) { next(error); }
});
router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const item = await Tournament.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Tournament not found." });
    res.json({ message: "Tournament deleted." });
  } catch (error) { next(error); }
});
export default router;
