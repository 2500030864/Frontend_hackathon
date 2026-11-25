import mongoose from "mongoose";

const cheatReportSchema = new mongoose.Schema({
  player: { type: String, required: true, trim: true, maxlength: 80 },
  game: { type: String, required: true, trim: true, maxlength: 80 },
  category: { type: String, required: true, trim: true, maxlength: 100 },
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  description: { type: String, required: true, maxlength: 3000 },
  evidence: { type: String, maxlength: 1500, default: "" },
  status: { type: String, enum: ["Pending Review", "Under Review", "Resolved", "Dismissed"], default: "Pending Review" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resolution: { type: String, maxlength: 2000, default: "" },
  reviewedAt: Date
}, { timestamps: true });

export default mongoose.model("CheatReport", cheatReportSchema);
