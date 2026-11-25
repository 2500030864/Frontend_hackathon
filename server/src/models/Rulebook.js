import mongoose from "mongoose";

const rulebookSchema = new mongoose.Schema({
  version: { type: Number, default: 1 },
  sections: [{
    title: { type: String, required: true },
    rules: [{ type: String, required: true }]
  }],
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
export default mongoose.model("Rulebook", rulebookSchema);
