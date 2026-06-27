import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createToolApi, deleteToolApi, fetchProductionData, updateStageStandardApi, updateToolApi } from "./apiClient";
import { useAuth } from "../auth/AuthContext";
import { decorateTool, getDashboardMetrics, sortStageMaster, stageMaster as mockStageMaster, tools as mockTools } from "./mockData";

const ToolStoreContext = createContext(null);

function normalizeTool(item, standards = mockStageMaster) {
  return decorateTool(
    {
      ...item,
      dueDate: item.dueDate || item.delivery,
      toolType: item.toolType || item.type,
      firestoreId: item.firestoreId || item.id
    },
    standards
  );
}

function getToolKey(tool) {
  return tool.firestoreId || tool.id;
}

function canSeeTool(tool, profile, isAdmin) {
  if (isAdmin) return true;
  const assignedTools = profile.assignedTools || [];
  const assignedMachines = profile.assignedMachines || [];
  if (!assignedTools.length && !assignedMachines.length) return true;
  return assignedTools.includes(tool.id) || assignedTools.includes(tool.firestoreId) || assignedMachines.includes(tool.machine);
}

function sortTools(nextTools) {
  return [...nextTools].sort((a, b) => String(a.id || a.firestoreId).localeCompare(String(b.id || b.firestoreId)));
}

function applyOverrides(nextTools, overrides, standards = mockStageMaster) {
  return nextTools.map((tool) => {
    const override = overrides[getToolKey(tool)];
    return override ? normalizeTool({ ...tool, ...override }, standards) : tool;
  });
}

function getLocalState(profile, isAdmin, overrides = {}) {
  const standards = sortStageMaster(mockStageMaster);
  const tools = sortTools(
    applyOverrides(
      mockTools.map((tool) => normalizeTool(tool, standards)),
      overrides,
      standards
    ).filter((item) => canSeeTool(item, profile, isAdmin))
  );

  return { standards, tools };
}

function friendlyDataError(err) {
  if (err?.name === "AbortError") return "MongoDB API is taking too long. Showing local sample data.";
  const message = String(err?.message || "");
  if (message.includes("SSL") || message.includes("tls") || message.includes("ECONN") || message.includes("Failed to fetch")) {
    return "MongoDB API is temporarily unavailable. Showing local sample data.";
  }
  return "MongoDB API is temporarily unavailable. Showing local sample data.";
}

export function ToolStoreProvider({ children }) {
  const { profile, isAdmin } = useAuth();
  const overridesRef = useRef({});
  const [stageStandards, setStageStandards] = useState(() => sortStageMaster(mockStageMaster));
  const [tools, setTools] = useState(() => getLocalState(profile, isAdmin, overridesRef.current).tools);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingLocalTools, setUsingLocalTools] = useState(true);

  const publishLocal = useCallback(() => {
    const local = getLocalState(profile, isAdmin, overridesRef.current);
    setStageStandards(local.standards);
    setTools(local.tools);
    setUsingLocalTools(true);
  }, [isAdmin, profile]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProductionData();
      const standards = sortStageMaster(data.stageMaster?.length ? data.stageMaster : mockStageMaster);
      const rawTools = data.tools?.length ? data.tools : mockTools;
      const nextTools = sortTools(
        applyOverrides(
          rawTools.map((tool) => normalizeTool(tool, standards)),
          overridesRef.current,
          standards
        ).filter((item) => canSeeTool(item, profile, isAdmin))
      );

      setStageStandards(standards);
      setTools(nextTools);
      setUsingLocalTools(false);
      setError(null);
    } catch (err) {
      publishLocal();
      setError(friendlyDataError(err));
    } finally {
      setLoading(false);
    }
  }, [isAdmin, profile, publishLocal]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateTool = useCallback(
    async (toolId, payload) => {
      const localPayload = {
        ...payload,
        updatedAt: new Date().toISOString()
      };

      overridesRef.current = {
        ...overridesRef.current,
        [toolId]: localPayload
      };

      setTools((current) =>
        sortTools(
          current.map((tool) =>
            getToolKey(tool) === toolId ? normalizeTool({ ...tool, ...localPayload }, stageStandards) : tool
          )
        )
      );

      if (!usingLocalTools) {
        try {
          await updateToolApi(toolId, payload);
          await refresh();
        } catch (err) {
          setError(err.message || "Tool updated locally, but MongoDB sync failed.");
        }
      }
    },
    [refresh, stageStandards, usingLocalTools]
  );

  const createTool = useCallback(
    async (payload) => {
      const nextTool = normalizeTool(
        {
          ...payload,
          id: String(payload.id || "").trim(),
          name: String(payload.name || "").trim(),
          customer: String(payload.customer || "").trim(),
          currentStage: payload.currentStage || "No Active Stage",
          completedMachineHours: payload.completedMachineHours || {},
          updatedAt: new Date().toISOString()
        },
        stageStandards
      );

      setTools((current) => sortTools([...current.filter((tool) => getToolKey(tool) !== nextTool.id), nextTool]));

      if (!usingLocalTools) {
        try {
          await createToolApi(payload);
          await refresh();
        } catch (err) {
          setError(err.message || "Tool created locally, but MongoDB sync failed.");
        }
      }
    },
    [refresh, stageStandards, usingLocalTools]
  );

  const deleteTool = useCallback(
    async (toolId) => {
      setTools((current) => current.filter((tool) => getToolKey(tool) !== toolId && tool.id !== toolId));
      if (!usingLocalTools) {
        try {
          await deleteToolApi(toolId);
          await refresh();
        } catch (err) {
          setError(err.message || "Tool deleted locally, but MongoDB sync failed.");
        }
      }
    },
    [refresh, usingLocalTools]
  );

  const updateStageStandard = useCallback(
    async (stageId, payload) => {
      const nextStandards = sortStageMaster(
        stageStandards.map((row) =>
          row.id === stageId || row.stage === stageId
            ? {
                ...row,
                ...payload,
                standardHours: {
                  ...row.standardHours,
                  ...(payload.standardHours || {})
                }
              }
            : row
        )
      );
      setStageStandards(nextStandards);
      setTools((current) => sortTools(current.map((tool) => normalizeTool(tool, nextStandards))));

      if (!usingLocalTools) {
        try {
          await updateStageStandardApi(stageId, payload);
          await refresh();
        } catch (err) {
          setError(err.message || "Stage standard updated locally, but MongoDB sync failed.");
        }
      }
    },
    [refresh, stageStandards, usingLocalTools]
  );

  const value = useMemo(
    () => ({
      tools,
      stageStandards,
      dashboard: getDashboardMetrics(tools, stageStandards),
      loading,
      error,
      usingLocalTools,
      refresh,
      updateTool,
      createTool,
      deleteTool,
      updateStageStandard
    }),
    [createTool, deleteTool, error, loading, refresh, stageStandards, tools, updateStageStandard, updateTool, usingLocalTools]
  );

  return <ToolStoreContext.Provider value={value}>{children}</ToolStoreContext.Provider>;
}

export function useToolStore() {
  return useContext(ToolStoreContext);
}
