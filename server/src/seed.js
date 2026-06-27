import "dotenv/config";
import mongoose from "mongoose";
import { connectDb } from "./db.js";
import { StageMaster } from "./models/StageMaster.js";
import { Tool } from "./models/Tool.js";
import { stageMasterSeed, toolSeed } from "./seedData.js";

async function upsertById(Model, rows) {
  await Promise.all(
    rows.map((row) =>
      Model.updateOne(
        { id: row.id },
        { $set: row },
        { upsert: true, runValidators: true }
      )
    )
  );
}

async function seed() {
  await connectDb();
  await upsertById(StageMaster, stageMasterSeed);
  await upsertById(Tool, toolSeed);
  console.log("Seeded MongoDB stageMaster and tools collections.");
  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
