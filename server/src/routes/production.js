import express from "express";
import { StageMaster } from "../models/StageMaster.js";
import { Tool } from "../models/Tool.js";

export const productionRouter = express.Router();

function serializeMachineHours(value) {
  if (!value) return {};
  if (value instanceof Map) return Object.fromEntries(value);
  return value;
}

productionRouter.get("/production", async (_req, res, next) => {
  try {
    const [stageMaster, tools] = await Promise.all([
      StageMaster.find({}).sort({ order: 1 }).lean(),
      Tool.find({}).sort({ id: 1 }).lean()
    ]);

    res.json({
      stageMaster: stageMaster.map((item) => ({
        ...item,
        mongoId: item._id.toString(),
        _id: undefined,
        __v: undefined
      })),
      tools: tools.map((item) => ({
        ...item,
        mongoId: item._id.toString(),
        completedMachineHours: serializeMachineHours(item.completedMachineHours),
        _id: undefined,
        __v: undefined
      }))
    });
  } catch (err) {
    next(err);
  }
});

productionRouter.get("/stage-master", async (_req, res, next) => {
  try {
    const rows = await StageMaster.find({}).sort({ order: 1 });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

productionRouter.patch("/stage-master/:id", async (req, res, next) => {
  try {
    const row = await StageMaster.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!row) return res.status(404).json({ message: "Stage standard not found" });
    return res.json(row);
  } catch (err) {
    return next(err);
  }
});

productionRouter.get("/tools", async (_req, res, next) => {
  try {
    const rows = await Tool.find({}).sort({ id: 1 });
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

productionRouter.post("/tools", async (req, res, next) => {
  try {
    const payload = {
      id: String(req.body.id || "").trim(),
      name: String(req.body.name || "").trim(),
      customer: String(req.body.customer || "").trim(),
      size: req.body.size,
      currentStage: req.body.currentStage || "No Active Stage",
      completedMachineHours: req.body.completedMachineHours || {},
      note: req.body.note || "",
      updatedBy: req.body.updatedBy || ""
    };

    if (!payload.id || !payload.name || !payload.customer || !payload.size) {
      return res.status(400).json({ message: "Tool no, name, customer, and size are required" });
    }

    const row = await Tool.create(payload);
    return res.status(201).json(row);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Tool number already exists" });
    }
    return next(err);
  }
});

productionRouter.patch("/tools/:id", async (req, res, next) => {
  try {
    const allowedPayload = {};
    ["name", "customer", "size", "currentStage", "completedMachineHours", "note", "updatedBy"].forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) allowedPayload[key] = req.body[key];
    });

    const row = await Tool.findOneAndUpdate(
      { id: req.params.id },
      { $set: allowedPayload },
      { new: true, runValidators: true }
    );

    if (!row) return res.status(404).json({ message: "Tool not found" });
    return res.json(row);
  } catch (err) {
    return next(err);
  }
});

productionRouter.delete("/tools/:id", async (req, res, next) => {
  try {
    const row = await Tool.findOneAndDelete({ id: req.params.id });
    if (!row) return res.status(404).json({ message: "Tool not found" });
    return res.json({ ok: true, id: req.params.id });
  } catch (err) {
    return next(err);
  }
});
