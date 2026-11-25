import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  gamertag: { type: String, required: true, trim: true, maxlength: 40 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["player", "admin"], default: "player" },
  primaryGame: { type: String, default: "Valorant" },
  region: { type: String, default: "Global" },
  registeredTournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tournament" }]
}, { timestamps: true });
export default mongoose.model("User", userSchema);
