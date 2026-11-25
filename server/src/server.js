import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import tournamentRoutes from "./routes/tournaments.js";
import rulebookRoutes from "./routes/rulebook.js";
import teamRoutes from "./routes/teams.js";
import moderationRoutes from "./routes/moderation.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const app = express();
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(","), credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-7", legacyHeaders: false }));

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "EsportsArena API" }));
app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/rulebook", rulebookRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/admin/moderation", moderationRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.code === 11000) return res.status(409).json({ message: "A record with that unique value already exists." });
  if (err.name === "ValidationError") return res.status(400).json({ message: err.message });
  res.status(500).json({ message: "Unexpected server error." });
});

const port = Number(process.env.PORT || 5000);
await connectDB();

if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const existing = await User.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await User.create({
      name: process.env.ADMIN_NAME || "EsportsArena Admin",
      gamertag: "ArenaAdmin", email, passwordHash, role: "admin", primaryGame: "All Games"
    });
    console.log("Initial administrator account created from environment settings.");
  }
}

app.listen(port, () => console.log(`EsportsArena API listening on http://localhost:${port}`));
