import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  tag: { type: String, required: true, trim: true, uppercase: true, maxlength: 6 },
  game: { type: String, required: true },
  captain: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: { type: String, maxlength: 500 },
  isBanned: { type: Boolean, default: false },
  banReason: { type: String, maxlength: 500, default: "" },
  bannedAt: Date,
  bannedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  unbannedAt: Date,
  unbannedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);
