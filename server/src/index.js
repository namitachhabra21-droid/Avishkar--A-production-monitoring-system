import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDb } from "./db.js";
import { productionRouter } from "./routes/production.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = new Set([
  process.env.CLIENT_ORIGIN,
  "http://127.0.0.1:8081",
  "http://localhost:8081"
].filter(Boolean));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked origin: ${origin}`));
  }
}));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "toolmind-api" });
});

app.use("/api", productionRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`ToolMind API running on http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
