import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, sharedStyles, spacing, statusColor } from "../constants/theme";
import { useAuth } from "../auth/AuthContext";
import { useToolStore } from "../data/ToolStoreContext";

const sizes = ["Large", "Medium", "Small"];

function textValue(value) {
  return value === undefined || value === null ? "" : String(value);
}

function SmallButton({ label, icon, tone = colors.accent, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: disabled ? 0.5 : pressed ? 0.78 : 1,
        backgroundColor: tone,
        borderRadius: 8,
        minHeight: 40,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 7
      })}
    >
      {icon ? <Icon name={icon} size={15} color={colors.white} /> : null}
      <Text style={{ color: colors.white, fontSize: 12, fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

function StatCard({ label, value, tone = colors.text }) {
  return (
    <View style={[sharedStyles.card, { flex: 1, minWidth: 150, padding: 14 }]}>
      <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "900", textTransform: "uppercase" }}>{label}</Text>
      <Text style={{ color: tone, fontSize: 24, fontWeight: "900", marginTop: 6 }}>{value}</Text>
    </View>
  );
}

function Input({ label, value, onChangeText, placeholder, keyboardType = "default", width = "100%" }) {
  return (
    <View style={{ width, minWidth: 130 }}>
      <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "900", marginBottom: 6, textTransform: "uppercase" }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={colors.muted}
        style={{
          minHeight: 42,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          backgroundColor: colors.surface,
          color: colors.text,
          fontWeight: "800",
          paddingHorizontal: 11
        }}
      />
    </View>
  );
}

function SizeSelector({ value, onChange }) {
  return (
    <View style={{ flexDirection: "row", gap: 8, minWidth: 240 }}>
      {sizes.map((size) => {
        const active = value === size;
        return (
          <Pressable
            key={size}
            onPress={() => onChange(size)}
            style={{
              flex: 1,
              minHeight: 42,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: active ? colors.accent : colors.border,
              backgroundColor: active ? colors.accent : colors.surface2
            }}
          >
            <Text style={{ color: active ? colors.white : colors.muted, fontSize: 12, fontWeight: "900" }}>{size}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AddToolPanel({ stages, onCreate, updatedBy }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    customer: "",
    size: "Medium",
    currentStage: "No Active Stage"
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const stageOptions = ["No Active Stage", ...stages.map((row) => row.stage)];

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit() {
    if (!form.id.trim() || !form.name.trim() || !form.customer.trim()) {
      setMessage("Tool no, name, and customer required.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await onCreate({
        ...form,
        id: form.id.trim(),
        name: form.name.trim(),
        customer: form.customer.trim(),
        completedMachineHours: {},
        note: "Created from admin portal",
        updatedBy
      });
      setMessage("Tool added.");
      setForm({ id: "", name: "", customer: "", size: "Medium", currentStage: "No Active Stage" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
      <View style={sharedStyles.between}>
        <View>
          <Text style={sharedStyles.cardTitle}>Add Tool</Text>
          <Text style={[sharedStyles.muted, { marginTop: 3 }]}>Create a new tool job with customer, size, and active stage.</Text>
        </View>
        {saving ? <ActivityIndicator color={colors.accent} /> : null}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: spacing.md, alignItems: "flex-end" }}>
        <Input label="Tool No" value={form.id} onChangeText={(value) => setField("id", value)} placeholder="T-116" width={120} />
        <Input label="Tool Name" value={form.name} onChangeText={(value) => setField("name", value)} placeholder="New Mould" width={220} />
        <Input label="Customer" value={form.customer} onChangeText={(value) => setField("customer", value)} placeholder="Customer name" width={220} />
        <View>
          <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "900", marginBottom: 6, textTransform: "uppercase" }}>Size</Text>
          <SizeSelector value={form.size} onChange={(value) => setField("size", value)} />
        </View>
      </View>

      <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "900", marginTop: spacing.md, marginBottom: 8, textTransform: "uppercase" }}>Current Stage</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {stageOptions.map((stage) => {
          const active = form.currentStage === stage;
          return (
            <Pressable
              key={stage}
              onPress={() => setField("currentStage", stage)}
              style={{
                minHeight: 38,
                minWidth: 116,
                justifyContent: "center",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: active ? colors.accent : colors.border,
                backgroundColor: active ? `${colors.accent}12` : colors.surface2,
                paddingHorizontal: 10
              }}
            >
              <Text style={{ color: active ? colors.accent : colors.muted, fontSize: 11, fontWeight: "900" }} numberOfLines={1}>{stage}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[sharedStyles.between, { marginTop: spacing.md }]}>
        <Text style={{ color: message.includes("required") ? colors.danger : colors.green, fontSize: 12, fontWeight: "800" }}>{message}</Text>
        <SmallButton label="Add Tool" icon="plus" onPress={submit} disabled={saving} />
      </View>
    </View>
  );
}

function ToolAdminTable({ tools, onDelete }) {
  const header = { color: colors.muted, fontSize: 11, fontWeight: "900" };
  return (
    <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
      <Text style={sharedStyles.cardTitle}>Tool Control</Text>
      <Text style={[sharedStyles.muted, { marginTop: 3, marginBottom: spacing.md }]}>Admin view for all running and pending jobs.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ minWidth: 980, borderColor: colors.border, borderWidth: 1, borderRadius: 8, overflow: "hidden" }}>
          <View style={{ flexDirection: "row", backgroundColor: colors.surface2, padding: 10 }}>
            <Text style={[header, { width: 88 }]}>Tool No</Text>
            <Text style={[header, { width: 190 }]}>Name</Text>
            <Text style={[header, { width: 170 }]}>Customer</Text>
            <Text style={[header, { width: 90 }]}>Size</Text>
            <Text style={[header, { width: 150 }]}>Stage</Text>
            <Text style={[header, { width: 90, textAlign: "right" }]}>Complete</Text>
            <Text style={[header, { width: 90, textAlign: "right" }]}>ETA</Text>
            <Text style={[header, { width: 90, textAlign: "right" }]}>Action</Text>
          </View>
          {tools.map((tool) => (
            <View key={tool.id} style={{ flexDirection: "row", padding: 10, borderTopColor: colors.border, borderTopWidth: 1, alignItems: "center" }}>
              <Text style={{ color: colors.accent, width: 88, fontWeight: "900" }}>{tool.id}</Text>
              <Text style={{ color: colors.text, width: 190, fontWeight: "800" }} numberOfLines={1}>{tool.name}</Text>
              <Text style={{ color: colors.muted, width: 170, fontWeight: "800" }} numberOfLines={1}>{tool.customer}</Text>
              <Text style={{ color: colors.text, width: 90, fontWeight: "800" }}>{tool.size}</Text>
              <Text style={{ color: tool.currentStage === "No Active Stage" ? colors.muted : colors.warn, width: 150, fontWeight: "800" }} numberOfLines={1}>{tool.currentStage}</Text>
              <Text style={{ color: colors.green, width: 90, textAlign: "right", fontWeight: "900" }}>{tool.completionPercentage}%</Text>
              <Text style={{ color: tool.pendingHrs ? colors.warn : colors.green, width: 90, textAlign: "right", fontWeight: "800" }}>{tool.estimatedWorkingDaysToComplete} d</Text>
              <Pressable onPress={() => onDelete(tool.id)} style={{ width: 90, alignItems: "flex-end" }}>
                <Icon name="trash-2" color={colors.danger} size={17} />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function StageEditor({ rows, onUpdate }) {
  const [drafts, setDrafts] = useState({});
  const [savingId, setSavingId] = useState(null);

  function getDraft(row) {
    return drafts[row.stage] || {
      manpower: textValue(row.manpower),
      Large: textValue(row.standardHours?.Large),
      Medium: textValue(row.standardHours?.Medium),
      Small: textValue(row.standardHours?.Small)
    };
  }

  function setDraft(row, key, value) {
    setDrafts((current) => ({
      ...current,
      [row.stage]: {
        ...getDraft(row),
        [key]: value.replace(/[^0-9.]/g, "")
      }
    }));
  }

  async function save(row) {
    const draft = getDraft(row);
    setSavingId(row.stage);
    try {
      await onUpdate(row.id || row.stage, {
        manpower: Number(draft.manpower) || 0,
        standardHours: {
          Large: Number(draft.Large) || 0,
          Medium: Number(draft.Medium) || 0,
          Small: Number(draft.Small) || 0
        }
      });
    } finally {
      setSavingId(null);
    }
  }

  return (
    <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
      <Text style={sharedStyles.cardTitle}>Stage Master</Text>
      <Text style={[sharedStyles.muted, { marginTop: 3, marginBottom: spacing.md }]}>Edit manpower and standard hours used in calculations.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ minWidth: 1040, borderColor: colors.border, borderWidth: 1, borderRadius: 8, overflow: "hidden" }}>
          <View style={{ flexDirection: "row", backgroundColor: colors.surface2, padding: 10 }}>
            {["Stage", "Department", "Machine", "Manpower", "Large Hrs", "Medium Hrs", "Small Hrs", "Save"].map((label, index) => (
              <Text key={label} style={{ color: colors.muted, fontSize: 11, fontWeight: "900", width: [160, 140, 190, 110, 120, 120, 120, 80][index], textAlign: index >= 3 ? "right" : "left" }}>{label}</Text>
            ))}
          </View>
          {rows.map((row) => {
            const draft = getDraft(row);
            return (
              <View key={row.stage} style={{ flexDirection: "row", padding: 10, borderTopColor: colors.border, borderTopWidth: 1, alignItems: "center" }}>
                <Text style={{ color: colors.text, width: 160, fontWeight: "900" }}>{row.stage}</Text>
                <Text style={{ color: colors.muted, width: 140, fontWeight: "800" }}>{row.department}</Text>
                <Text style={{ color: colors.muted, width: 190, fontWeight: "800" }}>{row.machine}</Text>
                {["manpower", "Large", "Medium", "Small"].map((key) => (
                  <TextInput
                    key={key}
                    value={draft[key]}
                    onChangeText={(value) => setDraft(row, key, value)}
                    keyboardType="numeric"
                    style={{
                      width: key === "manpower" ? 110 : 120,
                      minHeight: 36,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      color: colors.text,
                      fontWeight: "800",
                      textAlign: "right",
                      backgroundColor: colors.surface
                    }}
                  />
                ))}
                <Pressable onPress={() => save(row)} style={{ width: 80, alignItems: "flex-end" }}>
                  {savingId === row.stage ? <ActivityIndicator color={colors.accent} /> : <Icon name="save" color={colors.accent} size={18} />}
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function AlertPanel({ tools, stageSummary }) {
  const alerts = useMemo(() => {
    const items = [];
    tools.filter((tool) => tool.status === "Pending").slice(0, 4).forEach((tool) => {
      items.push({ tone: colors.warn, title: `${tool.id} has no active stage`, body: `${tool.pendingHrs} machine hrs pending.` });
    });
    tools.filter((tool) => tool.estimatedWorkingDaysToComplete > 20).slice(0, 4).forEach((tool) => {
      items.push({ tone: colors.danger, title: `${tool.id} ETA is high`, body: `${tool.estimatedWorkingDaysToComplete} working days remaining.` });
    });
    stageSummary.filter((stage) => stage.status === "Busy").slice(0, 4).forEach((stage) => {
      items.push({ tone: colors.accent, title: `${stage.stage} is busy`, body: `${stage.activeTools} active tool, ${stage.pendingHrs} hrs pending.` });
    });
    return items.slice(0, 8);
  }, [stageSummary, tools]);

  return (
    <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
      <Text style={sharedStyles.cardTitle}>Admin Alerts</Text>
      <Text style={[sharedStyles.muted, { marginTop: 3, marginBottom: spacing.md }]}>Exceptions that need planning attention.</Text>
      {alerts.length ? alerts.map((alert, index) => (
        <View key={`${alert.title}-${index}`} style={{ borderLeftWidth: 3, borderLeftColor: alert.tone, backgroundColor: colors.surface2, borderRadius: 8, padding: 11, marginBottom: 8 }}>
          <Text style={{ color: colors.text, fontWeight: "900" }}>{alert.title}</Text>
          <Text style={[sharedStyles.muted, { marginTop: 3 }]}>{alert.body}</Text>
        </View>
      )) : (
        <View style={{ backgroundColor: colors.surface2, borderRadius: 8, padding: 12 }}>
          <Text style={{ color: colors.green, fontWeight: "900" }}>No critical alerts right now.</Text>
        </View>
      )}
    </View>
  );
}

export default function AdminScreen() {
  const { profile, isAdmin } = useAuth();
  const { tools, stageStandards, dashboard, loading, error, usingLocalTools, createTool, deleteTool, updateStageStandard, refresh } = useToolStore();

  const delayedTools = tools.filter((tool) => tool.estimatedWorkingDaysToComplete > 20).length;
  const updatedBy = profile?.name || profile?.role || "Admin";

  return (
    <View style={sharedStyles.screen}>
      <View style={sharedStyles.appHeader}>
        <View style={sharedStyles.logoRow}>
          <View>
            <Text style={sharedStyles.logoText}>ADMIN</Text>
            <Text style={sharedStyles.logoSub}>Production control portal</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Pressable onPress={refresh} style={sharedStyles.livePill}>
              <Icon name="refresh-cw" size={14} color={colors.accent} />
              <Text style={{ color: colors.text, fontSize: 11, fontWeight: "900" }}>Refresh</Text>
            </Pressable>
            <View style={sharedStyles.livePill}>
              <Icon name={isAdmin ? "shield" : "user"} size={14} color={colors.accent} />
              <Text style={{ color: colors.text, fontSize: 11, fontWeight: "900" }}>{profile.role}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={sharedStyles.content} showsVerticalScrollIndicator={false}>
        {error ? (
          <View style={[sharedStyles.card, { marginBottom: spacing.md, borderColor: colors.warn }]}>
            <Text style={{ color: colors.warn, fontWeight: "900" }}>{usingLocalTools ? "Using local sample data" : "Sync warning"}</Text>
            <Text style={[sharedStyles.muted, { marginTop: 4 }]}>{error}</Text>
          </View>
        ) : null}

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: spacing.md }}>
          <StatCard label="Total Tools" value={dashboard.cards.totalTools} tone={colors.accent} />
          <StatCard label="Running" value={tools.filter((tool) => tool.status === "Running").length} tone={colors.green} />
          <StatCard label="Pending" value={tools.filter((tool) => tool.status === "Pending").length} tone={colors.warn} />
          <StatCard label="Delayed ETA" value={delayedTools} tone={delayedTools ? colors.danger : colors.green} />
          <StatCard label="Busy Stages" value={dashboard.cards.busyStages} tone={colors.blue} />
        </View>

        <AddToolPanel stages={stageStandards} onCreate={createTool} updatedBy={updatedBy} />
        <AlertPanel tools={tools} stageSummary={dashboard.stageSummary} />
        <ToolAdminTable tools={tools} onDelete={deleteTool} />
        <StageEditor rows={stageStandards} onUpdate={updateStageStandard} />

        <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
          <Text style={sharedStyles.cardTitle}>Recent Admin Activity</Text>
          <Text style={[sharedStyles.muted, { marginTop: 3, marginBottom: spacing.md }]}>Latest notes and updates recorded against tools.</Text>
          {tools.filter((tool) => tool.note || tool.updatedBy).slice(0, 8).map((tool) => (
            <View key={tool.id} style={{ flexDirection: "row", alignItems: "center", borderTopColor: colors.border, borderTopWidth: 1, paddingVertical: 10 }}>
              <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: statusColor(tool.status), marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: "900" }}>{tool.id} · {tool.name}</Text>
                <Text style={[sharedStyles.muted, { marginTop: 2 }]}>{tool.note || `Updated by ${tool.updatedBy || "operator"}`}</Text>
              </View>
              <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "800" }}>{tool.status}</Text>
            </View>
          ))}
        </View>

        {loading ? <ActivityIndicator color={colors.accent} /> : null}
      </ScrollView>
    </View>
  );
}
