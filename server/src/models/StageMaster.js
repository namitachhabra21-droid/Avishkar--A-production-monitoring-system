import mongoose from "mongoose";

const stageMasterSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    order: { type: Number, required: true },
    stage: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    machine: { type: String, required: true },
    manpower: { type: Number, required: true },
    standardHours: {
      Large: { type: Number, required: true },
      Medium: { type: Number, required: true },
      Small: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

stageMasterSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.mongoId = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const StageMaster = mongoose.model("StageMaster", stageMasterSchema);
