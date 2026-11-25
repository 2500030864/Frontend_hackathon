import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  game: { type: String, required: true, trim: true },
  gameId: { type: String, trim: true },
  mode: { type: String, default: "Squad" },
  format: { type: String, required: true },
  entryFee: { type: String, default: "Free Entry" },
  prizePool: { type: String, default: "TBA" },
  maxParticipants: { type: Number, default: 16, min: 2 },
  registeredParticipants: { type: Number, default: 0, min: 0 },
  registrationDeadline: Date,
  tournamentDate: Date,
  status: { type: String, enum: ["Draft", "Open", "Ongoing", "Completed"], default: "Draft" },
  region: { type: String, default: "Global" },
  platform: { type: String, default: "PC" },
  banner: String,
  description: String,
  rules: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
export default mongoose.model("Tournament", tournamentSchema);
