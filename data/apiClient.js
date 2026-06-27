import { Platform } from "react-native";

const defaultHost = Platform.OS === "android" ? "http://10.0.2.2:4000" : "http://127.0.0.1:4000";
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || defaultHost;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    signal: controller.signal,
    ...options
  }).finally(() => clearTimeout(timeout));

  if (!response.ok) {
    const text = await response.text();
    try {
      const parsed = JSON.parse(text);
      throw new Error(parsed.message || `API request failed: ${response.status}`);
    } catch {
      throw new Error(text || `API request failed: ${response.status}`);
    }
  }

  return response.json();
}

export function fetchProductionData() {
  return request("/api/production");
}

export function updateToolApi(toolId, payload) {
  return request(`/api/tools/${encodeURIComponent(toolId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function createToolApi(payload) {
  return request("/api/tools", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function deleteToolApi(toolId) {
  return request(`/api/tools/${encodeURIComponent(toolId)}`, {
    method: "DELETE"
  });
}

export function updateStageStandardApi(stageId, payload) {
  return request(`/api/stage-master/${encodeURIComponent(stageId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}
