const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const { getFirestore, writeBatch, doc, serverTimestamp } = require("firebase/firestore");

const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.trim().startsWith("#"))
    .forEach((line) => {
      const separatorIndex = line.indexOf("=");
      if (separatorIndex === -1) return;
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    });
}

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const missingKeys = ["apiKey", "authDomain", "projectId", "appId"].filter((key) => !firebaseConfig[key]);

if (missingKeys.length) {
  console.error(`Missing Firebase config: ${missingKeys.join(", ")}`);
  console.error("Set EXPO_PUBLIC_FIREBASE_* env vars before running npm run seed:firebase.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const stageMaster = [
  { id: "design", order: 1, stage: "Design", department: "Engineering", machine: "CAD Workstation", manpower: 6, standardHours: { Large: 80, Medium: 48, Small: 24 } },
  { id: "pre-machining", order: 2, stage: "Pre Machining", department: "Tool Room", machine: "Pre-Machining Machine", manpower: 1, standardHours: { Large: 40, Medium: 32, Small: 24 } },
  { id: "milling", order: 3, stage: "Milling", department: "Tool Room", machine: "Milling Machine", manpower: 3, standardHours: { Large: 32, Medium: 24, Small: 16 } },
  { id: "drilling-tapping", order: 4, stage: "Drilling / Tapping", department: "Tool Room", machine: "Drill/Tapping Machine", manpower: 1, standardHours: { Large: 16, Medium: 8, Small: 8 } },
  { id: "cnc-milling", order: 5, stage: "CNC Milling", department: "Tool Room", machine: "CNC Machine", manpower: 5, standardHours: { Large: 80, Medium: 56, Small: 32 } },
  { id: "finish-grinding", order: 6, stage: "Finish Grinding", department: "Tool Room", machine: "Grinding Machine", manpower: 6, standardHours: { Large: 32, Medium: 24, Small: 16 } },
  { id: "wirecut", order: 7, stage: "Wirecut", department: "Tool Room", machine: "Wirecut Machine", manpower: 5, standardHours: { Large: 48, Medium: 32, Small: 16 } },
  { id: "edm", order: 8, stage: "EDM", department: "Tool Room", machine: "EDM Machine", manpower: 4, standardHours: { Large: 144, Medium: 80, Small: 80 } },
  { id: "polishing", order: 9, stage: "Polishing", department: "Tool Room", machine: "Polishing Bench", manpower: 8, standardHours: { Large: 40, Medium: 24, Small: 16 } }
];

const tools = [
  {
    id: "T-101",
    name: "Foam Mould",
    customer: "Auto Components",
    size: "Large",
    currentStage: "No Active Stage",
    completedMachineHours: {
      Design: 80,
      "Pre Machining": 40,
      Milling: 32,
      "Drilling / Tapping": 16,
      "CNC Milling": 42.4,
      "Finish Grinding": 12.3
    }
  },
  {
    id: "T-102",
    name: "Seat Base Mould",
    customer: "Arihant Auto",
    size: "Medium",
    currentStage: "EDM",
    completedMachineHours: {
      Design: 48,
      "Pre Machining": 32,
      Milling: 24,
      "Drilling / Tapping": 8,
      "CNC Milling": 37.6
    }
  },
  {
    id: "T-103",
    name: "Checking Fixture",
    customer: "Triveni Engineering",
    size: "Small",
    currentStage: "Wirecut",
    completedMachineHours: {
      Design: 24,
      "Pre Machining": 24,
      Milling: 16,
      "Drilling / Tapping": 8,
      "CNC Milling": 11.2
    }
  }
];

function addCollection(batch, collectionName, rows) {
  rows.forEach((row) => {
    batch.set(doc(db, collectionName, row.id), {
      ...row,
      updatedAt: serverTimestamp()
    });
  });
}

async function seed() {
  const batch = writeBatch(db);

  addCollection(batch, "stageMaster", stageMaster);
  addCollection(batch, "tools", tools);

  await batch.commit();
  console.log("Seeded stageMaster and tools collections.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
