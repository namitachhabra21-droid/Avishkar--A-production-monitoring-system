import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, sharedStyles, spacing } from "../constants/theme";
import { useAuth } from "../auth/AuthContext";
import { useToolStore } from "../data/ToolStoreContext";

const filters = ["All", "Running", "Pending", "Completed"];
const sizes = ["Large", "Medium", "Small"];

function toneFor(status) {
  if (status === "Completed") return colors.green;
  if (status === "Pending") return colors.warn;
  return colors.accent;
}

function Field({ label, value, tone = colors.text }) {
  return (
    <View style={{ backgroundColor: colors.surface2, borderRadius: 8, padding: 12, marginBottom: spacing.sm }}>
      <Text style={[sharedStyles.muted, { textTransform: "uppercase", letterSpacing: 1 }]}>{label}</Text>
      <Text style={{ color: tone, fontSize: 16, fontWeight: "900", marginTop: 4 }}>{value || "-"}</Text>
    </View>
  );
}

function MetricTile({ label, value, tone = colors.text }) {
  return (
    <View style={{ flex: 1, minWidth: 135, backgroundColor: colors.surface2, borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: 11 }}>
      <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase" }}>{label}</Text>
      <Text style={{ color: tone, fontSize: 18, fontWeight: "900", marginTop: 5 }}>{value}</Text>
    </View>
  );
}

function FilterBar({ activeFilter, onChange }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: spacing.md }}>
      {filters.map((filter) => {
        const active = filter === activeFilter;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            style={{
              backgroundColor: active ? colors.accent : colors.surface2,
              borderColor: active ? colors.accent : colors.border,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 13,
              paddingVertical: 8
            }}
          >
            <Text style={{ color: active ? colors.white : colors.muted, fontSize: 12, fontWeight: "900" }}>{filter}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ToolCard({ item, onPress }) {
  const tone = toneFor(item.status);
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}>
      <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
        <View style={sharedStyles.between}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={{ color: colors.accent, fontSize: 15, fontWeight: "900" }}>{item.id}</Text>
            <Text style={{ color: colors.text, fontSize: 17, fontWeight: "900", marginTop: 2 }}>{item.name}</Text>
            <Text style={[sharedStyles.muted, { marginTop: 2 }]}>{item.customer} · {item.size}</Text>
          </View>
          <View style={{ backgroundColor: `${tone}22`, borderColor: `${tone}66`, borderWidth: 1, borderRadius: 16, paddingHorizontal: 9, paddingVertical: 5 }}>
            <Text style={{ color: tone, fontSize: 10, fontWeight: "900" }}>{item.status}</Text>
          </View>
        </View>
        <View style={{ marginTop: spacing.md }}>
          <View style={sharedStyles.between}>
            <Text style={sharedStyles.muted}>Current active stage</Text>
            <Text style={{ color: item.currentStage === "No Active Stage" ? colors.muted : colors.warn, fontWeight: "900" }}>{item.currentStage}</Text>
          </View>
          <View style={{ height: 8, backgroundColor: colors.surface2, borderRadius: 4, marginTop: 10, overflow: "hidden" }}>
            <View style={{ width: `${Math.min(item.utilization, 100)}%`, height: 8, backgroundColor: tone }} />
          </View>
          <View style={[sharedStyles.between, { marginTop: 8 }]}>
            <Text style={sharedStyles.muted}>{item.completedHrs}/{item.plannedHrs} machine hrs</Text>
            <Text style={{ color: colors.blue, fontSize: 12, fontWeight: "900" }}>{item.utilization}%</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function ToolTable({ tools, onOpenTool }) {
  const header = { color: colors.muted, fontSize: 11, fontWeight: "900" };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ minWidth: 1120, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 8, overflow: "hidden" }}>
        <View style={{ flexDirection: "row", backgroundColor: colors.surface2, paddingHorizontal: spacing.md, paddingVertical: 10 }}>
          <Text style={[header, { width: 88 }]}>Tool No</Text>
          <Text style={[header, { width: 170 }]}>Tool Name</Text>
          <Text style={[header, { width: 90 }]}>Size</Text>
          <Text style={[header, { width: 155 }]}>Current Stage</Text>
          <Text style={[header, { width: 118, textAlign: "right" }]}>Planned Hrs</Text>
          <Text style={[header, { width: 125, textAlign: "right" }]}>Completed Hrs</Text>
          <Text style={[header, { width: 115, textAlign: "right" }]}>Pending Hrs</Text>
          <Text style={[header, { width: 90, textAlign: "right" }]}>Complete</Text>
          <Text style={[header, { width: 92, textAlign: "right" }]}>ETA</Text>
          <Text style={[header, { width: 90, textAlign: "right" }]}>Status</Text>
        </View>
        {tools.map((item) => {
          const tone = toneFor(item.status);
          return (
            <Pressable
              key={item.firestoreId || item.id}
              onPress={() => onOpenTool(item)}
              style={({ pressed }) => ({
                flexDirection: "row",
                paddingHorizontal: spacing.md,
                paddingVertical: 12,
                borderTopColor: colors.border,
                borderTopWidth: 1,
                opacity: pressed ? 0.75 : 1
              })}
            >
              <Text style={{ color: colors.accent, width: 88, fontWeight: "900" }}>{item.id}</Text>
              <Text style={{ color: colors.text, width: 170, fontWeight: "800" }} numberOfLines={1}>{item.name}</Text>
              <Text style={{ color: colors.muted, width: 90, fontWeight: "800" }}>{item.size}</Text>
              <Text style={{ color: item.currentStage === "No Active Stage" ? colors.muted : colors.warn, width: 155, fontWeight: "800" }} numberOfLines={1}>{item.currentStage}</Text>
              <Text style={{ color: colors.text, width: 118, textAlign: "right" }}>{item.plannedHrs}</Text>
              <Text style={{ color: colors.green, width: 125, textAlign: "right" }}>{item.completedHrs}</Text>
              <Text style={{ color: item.pendingHrs ? colors.warn : colors.green, width: 115, textAlign: "right" }}>{item.pendingHrs}</Text>
              <Text style={{ color: colors.green, width: 90, textAlign: "right", fontWeight: "900" }}>{item.completionPercentage ?? item.utilization}%</Text>
              <Text style={{ color: item.pendingHrs ? colors.warn : colors.green, width: 92, textAlign: "right", fontWeight: "800" }}>{item.estimatedWorkingDaysToComplete ?? 0} d</Text>
              <Text style={{ color: tone, width: 90, textAlign: "right", fontSize: 12, fontWeight: "900" }}>{item.status}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

function ToolDetailScreen({ tool, stageStandards, onBack, onUpdate, updatedBy }) {
  const [draftStage, setDraftStage] = useState(tool.currentStage || "No Active Stage");
  const [draftSize, setDraftSize] = useState(tool.size || "Large");
  const [completedDraft, setCompletedDraft] = useState({});
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraftStage(tool.currentStage || "No Active Stage");
    setDraftSize(tool.size || "Large");
    setCompletedDraft(
      tool.stageRows.reduce((acc, row) => {
        acc[row.stage] = String(row.completedMachineHrs || "");
        return acc;
      }, {})
    );
  }, [tool.currentStage, tool.size, tool.stageRows]);

  function updateCompletedHour(stage, value) {
    const sanitized = value.replace(/[^0-9.]/g, "");
    setCompletedDraft((current) => ({
      ...current,
      [stage]: sanitized
    }));
  }

  function buildCompletedHours() {
    return tool.stageRows.reduce((acc, row) => {
      const value = Number(completedDraft[row.stage]);
      acc[row.stage] = Number.isFinite(value) ? Math.max(0, Math.min(value, row.plannedMachineHrs)) : 0;
      return acc;
    }, {});
  }

  async function save() {
    setSaving(true);
    try {
      await onUpdate?.(tool.firestoreId || tool.id, {
        currentStage: draftStage,
        size: draftSize,
        completedMachineHours: buildCompletedHours(),
        note: note.trim(),
        updatedBy
      });
      setNote("");
    } finally {
      setSaving(false);
    }
  }

  const tone = toneFor(tool.status);
  const stageOptions = ["No Active Stage", ...stageStandards.map((row) => row.stage)];

  return (
    <View style={sharedStyles.screen}>
      <View style={sharedStyles.appHeader}>
        <Pressable onPress={onBack} style={[sharedStyles.row, { marginBottom: spacing.md }]}>
          <Icon name="arrow-left" color={colors.accent} size={20} />
          <Text style={{ color: colors.accent, fontWeight: "900", marginLeft: 8 }}>TOOLS</Text>
        </Pressable>
        <View style={sharedStyles.between}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={sharedStyles.logoText}>{tool.id}</Text>
            <Text style={sharedStyles.logoSub}>{tool.name}</Text>
          </View>
          <View style={{ backgroundColor: `${tone}22`, borderColor: `${tone}66`, borderWidth: 1, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ color: tone, fontSize: 11, fontWeight: "900" }}>{tool.status}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={sharedStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
          <View style={sharedStyles.between}>
            <View style={{ flex: 1, paddingRight: spacing.md }}>
              <Text style={sharedStyles.sectionTitle}>Update Tool</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: "900" }}>{draftStage}</Text>
              <Text style={[sharedStyles.muted, { marginTop: 3 }]}>Current active stage</Text>
            </View>
            <View style={{ backgroundColor: `${tone}16`, borderColor: `${tone}55`, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 }}>
              <Text style={{ color: tone, fontSize: 11, fontWeight: "900" }}>{tool.status}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: spacing.md }}>
            <MetricTile label="Completion" value={`${tool.completionPercentage ?? tool.utilization}%`} tone={colors.green} />
            <MetricTile label="Est. Time Left" value={`${tool.estimatedMachineHoursToComplete ?? tool.pendingHrs} hrs`} tone={tool.pendingHrs ? colors.warn : colors.green} />
            <MetricTile label="Working Days" value={`${tool.estimatedWorkingDaysToComplete ?? 0} days`} tone={tool.pendingHrs ? colors.warn : colors.green} />
          </View>

          <Text style={[sharedStyles.muted, { marginTop: spacing.md, marginBottom: spacing.xs }]}>Tool Size</Text>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: spacing.md }}>
            {sizes.map((size) => (
              <Pressable key={size} onPress={() => setDraftSize(size)} style={{ flex: 1, backgroundColor: draftSize === size ? colors.accent : colors.surface2, borderColor: draftSize === size ? colors.accent : colors.border, borderWidth: 1, borderRadius: 8, paddingVertical: 10, alignItems: "center" }}>
                <Text style={{ color: draftSize === size ? colors.white : colors.muted, fontWeight: "900" }}>{size}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[sharedStyles.muted, { marginBottom: spacing.xs }]}>Set Current Stage</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 2 }}>
            {stageOptions.map((stage) => (
              <Pressable
                key={stage}
                onPress={() => setDraftStage(stage)}
                style={{
                  minWidth: 118,
                  minHeight: 42,
                  justifyContent: "center",
                  backgroundColor: draftStage === stage ? `${colors.accent}12` : colors.surface2,
                  borderColor: draftStage === stage ? colors.accent : colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ color: draftStage === stage ? colors.accent : colors.muted, fontSize: 11, fontWeight: "900" }} numberOfLines={1}>{stage}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add queue note or shift comment"
            placeholderTextColor={colors.muted}
            multiline
            style={{ minHeight: 76, borderColor: colors.border, borderWidth: 1, borderRadius: 8, backgroundColor: colors.surface2, color: colors.text, padding: 12, textAlignVertical: "top", marginTop: spacing.md }}
          />

          <Pressable onPress={save} disabled={saving} style={{ marginTop: spacing.md, backgroundColor: saving ? colors.border : colors.accent, borderRadius: 8, paddingVertical: 13, alignItems: "center" }}>
            {saving ? <ActivityIndicator color={colors.white} /> : <Text style={{ color: colors.white, fontWeight: "900" }}>Save Updates</Text>}
          </Pressable>
        </View>

        <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
          <Text style={sharedStyles.sectionTitle}>Tool Hours</Text>
          <Field label="Planned Machine Hrs" value={tool.plannedHrs} />
          <Field label="Completed Machine Hrs" value={tool.completedHrs} tone={colors.green} />
          <Field label="Pending Machine Hrs" value={tool.pendingHrs} tone={tool.pendingHrs ? colors.warn : colors.green} />
          <Field label="Completion Percentage" value={`${tool.completionPercentage ?? tool.utilization}%`} tone={colors.green} />
          <Field label="Estimated Time To Complete" value={`${tool.estimatedMachineHoursToComplete ?? tool.pendingHrs} machine hrs / ${tool.estimatedWorkingDaysToComplete ?? 0} days`} tone={tool.pendingHrs ? colors.warn : colors.green} />
          <Field label="Planned Man-Hrs" value={tool.plannedManHrs} />
          <Field label="Completed Man-Hrs" value={tool.completedManHrs} tone={colors.green} />
          <Field label="Pending Man-Hrs" value={tool.pendingManHrs} tone={tool.pendingManHrs ? colors.warn : colors.green} />
        </View>

        <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
          <Text style={sharedStyles.sectionTitle}>Stage Breakdown</Text>
          {tool.stageRows.map((row) => {
            const done = row.pendingMachineHrs <= 0;
            const active = tool.currentStage === row.stage;
            const rowTone = active ? colors.warn : done ? colors.green : colors.muted;
            return (
              <View key={row.stage} style={{ borderTopColor: colors.border, borderTopWidth: 1, paddingVertical: 10 }}>
                <View style={sharedStyles.between}>
                  <Text style={{ color: colors.text, fontWeight: "900", flex: 1 }}>{row.stage}</Text>
                  <Text style={{ color: rowTone, fontSize: 12, fontWeight: "900" }}>{active ? "ACTIVE" : done ? "DONE" : "PENDING"}</Text>
                </View>
                <Text style={[sharedStyles.muted, { marginTop: 3 }]}>{row.machine} · manpower {row.manpower}</Text>
                <View style={[sharedStyles.between, { marginTop: 6 }]}>
                  <Text style={sharedStyles.muted}>Machine hrs {row.completedMachineHrs}/{row.plannedMachineHrs}</Text>
                  <Text style={sharedStyles.muted}>Man-hrs {row.completedManHrs}/{row.plannedManHrs}</Text>
                </View>
                <View style={{ marginTop: spacing.sm }}>
                  <Text style={[sharedStyles.muted, { marginBottom: 5 }]}>Completed machine hrs</Text>
                  <TextInput
                    value={completedDraft[row.stage] ?? ""}
                    onChangeText={(value) => updateCompletedHour(row.stage, value)}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={colors.muted}
                    style={{
                      height: 42,
                      borderColor: active ? colors.warn : colors.border,
                      borderWidth: 1,
                      borderRadius: 8,
                      backgroundColor: colors.surface2,
                      color: colors.text,
                      paddingHorizontal: 10,
                      fontWeight: "900"
                    }}
                  />
                  <Text style={[sharedStyles.muted, { marginTop: 4 }]}>Max standard: {row.plannedMachineHrs} hrs</Text>
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </View>
  );
}

export default function RunMonitorScreen({ route, navigation }) {
  const { profile, user } = useAuth();
  const { tools, stageStandards, loading, error, usingLocalTools, updateTool } = useToolStore();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    setSelectedTool((current) => {
      if (!current) return current;
      return tools.find((item) => (item.firestoreId || item.id) === (current.firestoreId || current.id)) || current;
    });
  }, [tools]);

  useEffect(() => {
    const toolId = route?.params?.toolId;
    if (!toolId || !tools.length) return;
    const nextTool = tools.find((item) => (item.firestoreId || item.id) === toolId || item.id === toolId);
    if (nextTool) {
      setSelectedTool(nextTool);
      navigation?.setParams?.({ toolId: undefined });
    }
  }, [navigation, route?.params?.toolId, tools]);

  const filteredTools = useMemo(
    () => (activeFilter === "All" ? tools : tools.filter((item) => item.status === activeFilter)),
    [activeFilter, tools]
  );

  if (selectedTool) {
    return (
      <ToolDetailScreen
        tool={selectedTool}
        stageStandards={stageStandards}
        onBack={() => setSelectedTool(null)}
        onUpdate={updateTool}
        updatedBy={profile.name || user?.email || "Unknown user"}
      />
    );
  }

  return (
    <View style={sharedStyles.screen}>
      <View style={sharedStyles.appHeader}>
        <Text style={sharedStyles.logoText}>TOOLS</Text>
        <Text style={sharedStyles.logoSub}>{usingLocalTools ? "Local tracker data" : "Realtime tracker data"}</Text>
      </View>
      {loading && !tools.length ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={{ color: colors.muted, marginTop: spacing.md, fontWeight: "800" }}>Loading tracker...</Text>
        </View>
      ) : error && !tools.length ? (
        <View style={{ flex: 1, padding: spacing.md, justifyContent: "center" }}>
          <View style={sharedStyles.card}>
            <Icon name="alert-triangle" color={colors.danger} size={24} />
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "900", marginTop: spacing.md }}>Data error</Text>
            <Text style={{ color: colors.muted, marginTop: spacing.sm, lineHeight: 20 }}>{error}</Text>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={sharedStyles.content} showsVerticalScrollIndicator={false}>
          {error ? (
            <View style={{ backgroundColor: `${colors.warn}12`, borderColor: `${colors.warn}55`, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: spacing.md }}>
              <View style={sharedStyles.row}>
                <Icon name="wifi-off" color={colors.warn} size={17} />
                <Text style={{ color: colors.warn, fontWeight: "900", marginLeft: 8 }}>Using local sample data</Text>
              </View>
              <Text style={[sharedStyles.muted, { marginTop: 5 }]}>{error}</Text>
            </View>
          ) : null}
          <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
          {filteredTools.length ? (
            <ToolTable tools={filteredTools} onOpenTool={setSelectedTool} />
          ) : (
            <View style={[sharedStyles.card, { alignItems: "center", marginTop: spacing.lg }]}>
              <Text style={{ color: colors.text, fontWeight: "900" }}>No tools found</Text>
              <Text style={[sharedStyles.muted, { marginTop: spacing.xs }]}>Try another filter.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
