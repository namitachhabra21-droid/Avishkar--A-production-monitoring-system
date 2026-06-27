export const stageMaster = [
  { stage: "Design", department: "Engineering", machine: "CAD Workstation", manpower: 6, standardHours: { Large: 80, Medium: 48, Small: 24 } },
  { stage: "Pre Machining", department: "Tool Room", machine: "Pre-Machining Machine", manpower: 1, standardHours: { Large: 40, Medium: 32, Small: 24 } },
  { stage: "Milling", department: "Tool Room", machine: "Milling Machine", manpower: 3, standardHours: { Large: 32, Medium: 24, Small: 16 } },
  { stage: "Drilling / Tapping", department: "Tool Room", machine: "Drill/Tapping Machine", manpower: 1, standardHours: { Large: 16, Medium: 8, Small: 8 } },
  { stage: "CNC Milling", department: "Tool Room", machine: "CNC Machine", manpower: 5, standardHours: { Large: 80, Medium: 56, Small: 32 } },
  { stage: "Finish Grinding", department: "Tool Room", machine: "Grinding Machine", manpower: 6, standardHours: { Large: 32, Medium: 24, Small: 16 } },
  { stage: "Wirecut", department: "Tool Room", machine: "Wirecut Machine", manpower: 5, standardHours: { Large: 48, Medium: 32, Small: 16 } },
  { stage: "EDM", department: "Tool Room", machine: "EDM Machine", manpower: 4, standardHours: { Large: 144, Medium: 80, Small: 80 } },
  { stage: "Polishing", department: "Tool Room", machine: "Polishing Bench", manpower: 8, standardHours: { Large: 40, Medium: 24, Small: 16 } }
];

export const tools = [
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

export function sortStageMaster(rows = stageMaster) {
  return [...rows].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : stageMaster.findIndex((item) => item.stage === a.stage);
    const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : stageMaster.findIndex((item) => item.stage === b.stage);
    return orderA - orderB;
  });
}

function round(value, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round((Number(value) || 0) * factor) / factor;
}

export function getStageStandard(stageName, standards = stageMaster) {
  return standards.find((item) => item.stage === stageName);
}

export function plannedMachineHours(tool, stageName, standards = stageMaster) {
  return getStageStandard(stageName, standards)?.standardHours?.[tool.size] || 0;
}

export function completedMachineHours(tool, stageName) {
  return Number(tool.completedMachineHours?.[stageName]) || 0;
}

export function decorateTool(tool, standards = stageMaster) {
  const sortedStandards = sortStageMaster(standards);
  const stageRows = sortedStandards.map((standard) => {
    const plannedMachine = plannedMachineHours(tool, standard.stage, sortedStandards);
    const completedMachine = Math.min(plannedMachine, completedMachineHours(tool, standard.stage));
    const pendingMachine = Math.max(0, plannedMachine - completedMachine);
    const utilization = plannedMachine ? round((completedMachine / plannedMachine) * 100, 0) : 0;

    return {
      ...standard,
      plannedMachineHrs: round(plannedMachine),
      completedMachineHrs: round(completedMachine),
      pendingMachineHrs: round(pendingMachine),
      plannedManHrs: round(plannedMachine * standard.manpower),
      completedManHrs: round(completedMachine * standard.manpower),
      pendingManHrs: round(pendingMachine * standard.manpower),
      utilization
    };
  });

  const plannedHrs = round(stageRows.reduce((sum, row) => sum + row.plannedMachineHrs, 0));
  const completedHrs = round(stageRows.reduce((sum, row) => sum + row.completedMachineHrs, 0));
  const pendingHrs = round(stageRows.reduce((sum, row) => sum + row.pendingMachineHrs, 0));
  const plannedManHrs = round(stageRows.reduce((sum, row) => sum + row.plannedManHrs, 0));
  const completedManHrs = round(stageRows.reduce((sum, row) => sum + row.completedManHrs, 0));
  const pendingManHrs = round(stageRows.reduce((sum, row) => sum + row.pendingManHrs, 0));
  const status = pendingHrs <= 0 ? "Completed" : tool.currentStage === "No Active Stage" ? "Pending" : "Running";
  const completionPercentage = plannedHrs ? round((completedHrs / plannedHrs) * 100, 0) : 0;
  const estimatedWorkingDaysToComplete = round(pendingHrs / 8, 1);

  return {
    ...tool,
    dueDate: tool.dueDate || "Review cycle",
    toolType: tool.size,
    status,
    machine: tool.currentStage,
    machineFull: tool.currentStage,
    progress: stageRows.filter((row) => row.pendingMachineHrs <= 0).length,
    stageRows,
    plannedHrs,
    completedHrs,
    pendingHrs,
    plannedManHrs,
    completedManHrs,
    pendingManHrs,
    completionPercentage,
    estimatedMachineHoursToComplete: pendingHrs,
    estimatedWorkingDaysToComplete,
    utilization: completionPercentage,
    manpowerUtilization: plannedManHrs ? round((completedManHrs / plannedManHrs) * 100, 0) : 0
  };
}

export function summarizeStages(sourceTools, standards = stageMaster) {
  const sortedStandards = sortStageMaster(standards);
  const decoratedTools = sourceTools.map((tool) => decorateTool(tool, sortedStandards));

  return sortedStandards.map((standard) => {
    const rows = decoratedTools.map((tool) => {
      const stageRow = tool.stageRows.find((item) => item.stage === standard.stage);
      return { tool, stageRow };
    });
    const activeTools = rows.filter(({ tool }) => tool.currentStage === standard.stage).length;
    const completedTools = rows.filter(({ stageRow }) => stageRow.pendingMachineHrs <= 0).length;
    const pendingTools = rows.filter(({ stageRow }) => stageRow.pendingMachineHrs > 0).length;
    const plannedHrs = round(rows.reduce((sum, row) => sum + row.stageRow.plannedMachineHrs, 0));
    const completedHrs = round(rows.reduce((sum, row) => sum + row.stageRow.completedMachineHrs, 0));
    const pendingHrs = round(rows.reduce((sum, row) => sum + row.stageRow.pendingMachineHrs, 0));
    const plannedManHrs = round(rows.reduce((sum, row) => sum + row.stageRow.plannedManHrs, 0));
    const completedManHrs = round(rows.reduce((sum, row) => sum + row.stageRow.completedManHrs, 0));
    const pendingManHrs = round(rows.reduce((sum, row) => sum + row.stageRow.pendingManHrs, 0));
    const utilization = plannedHrs ? round((completedHrs / plannedHrs) * 100, 0) : 0;
    const manpowerUtilization = plannedManHrs ? round((completedManHrs / plannedManHrs) * 100, 0) : 0;
    const status = activeTools > 0 ? "Busy" : pendingTools > 0 ? "Free but Pending" : "Free / Completed";
    const decision = activeTools > 0 || utilization > 75
      ? "Do not allocate new job"
      : pendingTools > 0
        ? "Can allocate next job after queue check"
        : "Can allocate new job";

    return {
      ...standard,
      activeTools,
      completedTools,
      pendingTools,
      plannedHrs,
      completedHrs,
      pendingHrs,
      plannedManHrs,
      completedManHrs,
      pendingManHrs,
      utilization,
      manpowerUtilization,
      status,
      decision
    };
  });
}

export function getDashboardMetrics(sourceTools, standards = stageMaster) {
  const sortedStandards = sortStageMaster(standards);
  const decoratedTools = sourceTools.map((tool) => decorateTool(tool, sortedStandards));
  const stageSummary = summarizeStages(sourceTools, sortedStandards);
  const totalPlannedHrs = round(decoratedTools.reduce((sum, tool) => sum + tool.plannedHrs, 0));
  const completedHrs = round(decoratedTools.reduce((sum, tool) => sum + tool.completedHrs, 0));
  const pendingHrs = round(decoratedTools.reduce((sum, tool) => sum + tool.pendingHrs, 0));
  const totalPlannedManHrs = round(decoratedTools.reduce((sum, tool) => sum + tool.plannedManHrs, 0));
  const completedManHrs = round(decoratedTools.reduce((sum, tool) => sum + tool.completedManHrs, 0));

  return {
    tools: decoratedTools,
    stageSummary,
    cards: {
      totalTools: decoratedTools.length,
      busyStages: stageSummary.filter((item) => item.status === "Busy").length,
      freeCompletedStages: stageSummary.filter((item) => item.status === "Free / Completed").length,
      attentionActivities: stageSummary.filter((item) => item.status !== "Free / Completed").length,
      totalPlannedHrs,
      completedHrs,
      pendingHrs,
      avgMachineUtilization: totalPlannedHrs ? round((completedHrs / totalPlannedHrs) * 100, 0) : 0,
      avgManpowerUtilization: totalPlannedManHrs ? round((completedManHrs / totalPlannedManHrs) * 100, 0) : 0
    }
  };
}

export const machines = stageMaster.map((stage) => ({
  id: stage.stage,
  type: `${stage.department} · ${stage.machine}`,
  machine: stage.machine,
  manpower: stage.manpower,
  standardHours: stage.standardHours
}));
