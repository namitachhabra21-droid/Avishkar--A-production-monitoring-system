export const stageMasterSeed = [
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

export const toolSeed = [
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
  },
  {
    id: "T-104",
    name: "Door Trim Tool",
    customer: "Mahindra Interiors",
    size: "Large",
    currentStage: "CNC Milling",
    completedMachineHours: { Design: 80, "Pre Machining": 40, Milling: 32, "Drilling / Tapping": 16, "CNC Milling": 28 }
  },
  {
    id: "T-105",
    name: "Panel Checking Gauge",
    customer: "Tata AutoComp",
    size: "Medium",
    currentStage: "Finish Grinding",
    completedMachineHours: { Design: 48, "Pre Machining": 32, Milling: 24, "Drilling / Tapping": 8, "CNC Milling": 56, "Finish Grinding": 9.5 }
  },
  {
    id: "T-106",
    name: "Bottle Cap Mould",
    customer: "Packwell Industries",
    size: "Small",
    currentStage: "Polishing",
    completedMachineHours: { Design: 24, "Pre Machining": 24, Milling: 16, "Drilling / Tapping": 8, "CNC Milling": 32, "Finish Grinding": 16, Wirecut: 16, EDM: 80, Polishing: 5 }
  },
  {
    id: "T-107",
    name: "Console Insert Mould",
    customer: "Arihant Auto",
    size: "Large",
    currentStage: "EDM",
    completedMachineHours: { Design: 80, "Pre Machining": 40, Milling: 32, "Drilling / Tapping": 16, "CNC Milling": 80, "Finish Grinding": 32, Wirecut: 48, EDM: 61 }
  },
  {
    id: "T-108",
    name: "Air Vent Fixture",
    customer: "Auto Components",
    size: "Small",
    currentStage: "Milling",
    completedMachineHours: { Design: 24, "Pre Machining": 24, Milling: 6 }
  },
  {
    id: "T-109",
    name: "Seat Recliner Gauge",
    customer: "Triveni Engineering",
    size: "Medium",
    currentStage: "No Active Stage",
    completedMachineHours: { Design: 48, "Pre Machining": 12 }
  },
  {
    id: "T-110",
    name: "Washer Form Tool",
    customer: "Precision Stampings",
    size: "Small",
    currentStage: "Completed",
    completedMachineHours: { Design: 24, "Pre Machining": 24, Milling: 16, "Drilling / Tapping": 8, "CNC Milling": 32, "Finish Grinding": 16, Wirecut: 16, EDM: 80, Polishing: 16 }
  },
  {
    id: "T-111",
    name: "Bumper Bracket Mould",
    customer: "Mahindra Interiors",
    size: "Large",
    currentStage: "Pre Machining",
    completedMachineHours: { Design: 80, "Pre Machining": 18 }
  },
  {
    id: "T-112",
    name: "Switch Bezel Tool",
    customer: "Tata AutoComp",
    size: "Medium",
    currentStage: "Drilling / Tapping",
    completedMachineHours: { Design: 48, "Pre Machining": 32, Milling: 24, "Drilling / Tapping": 3 }
  },
  {
    id: "T-113",
    name: "Handle Grip Mould",
    customer: "Packwell Industries",
    size: "Medium",
    currentStage: "Wirecut",
    completedMachineHours: { Design: 48, "Pre Machining": 32, Milling: 24, "Drilling / Tapping": 8, "CNC Milling": 56, "Finish Grinding": 24, Wirecut: 14 }
  },
  {
    id: "T-114",
    name: "Bracket Piercing Tool",
    customer: "Precision Stampings",
    size: "Small",
    currentStage: "Design",
    completedMachineHours: { Design: 10 }
  },
  {
    id: "T-115",
    name: "HVAC Duct Mould",
    customer: "Auto Components",
    size: "Large",
    currentStage: "Polishing",
    completedMachineHours: { Design: 80, "Pre Machining": 40, Milling: 32, "Drilling / Tapping": 16, "CNC Milling": 80, "Finish Grinding": 32, Wirecut: 48, EDM: 144, Polishing: 18 }
  }
];
