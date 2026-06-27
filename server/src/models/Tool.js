import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    customer: { type: String, required: true },
    size: { type: String, enum: ["Large", "Medium", "Small"], required: true },
    currentStage: { type: String, default: "No Active Stage" },
    completedMachineHours: { type: Map, of: Number, default: {} },
    note: { type: String, default: "" },
    updatedBy: { type: String, default: "" }
  },
  { timestamps: true }
);

toolSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.mongoId = ret._id.toString();
    if (ret.completedMachineHours instanceof Map) {
      ret.completedMachineHours = Object.fromEntries(ret.completedMachineHours);
    } else {
      ret.completedMachineHours = ret.completedMachineHours || {};
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Tool = mongoose.model("Tool", toolSchema);
