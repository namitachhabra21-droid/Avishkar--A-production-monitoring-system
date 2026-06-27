import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import { colors, sharedStyles, spacing } from "../constants/theme";
import { useToolStore } from "../data/ToolStoreContext";

function round(value) {
  return Math.round((Number(value) || 0) * 10) / 10;
}

function CustomerCard({ item }) {
  const tone = item.pendingHrs > 200 ? colors.danger : item.pendingHrs > 0 ? colors.warn : colors.green;

  return (
    <View style={[sharedStyles.card, { marginBottom: spacing.md }]}>
      <View style={sharedStyles.between}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text style={sharedStyles.cardTitle}>{item.name}</Text>
          <Text style={[sharedStyles.muted, { marginTop: 3 }]}>{item.total} tools · {item.toolIds.join(", ")}</Text>
        </View>
        <View style={{ backgroundColor: `${tone}22`, borderColor: `${tone}66`, borderWidth: 1, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={{ color: tone, fontSize: 11, fontWeight: "900" }}>{item.pendingHrs ? "PENDING" : "CLEAR"}</Text>
        </View>
      </View>

      <View style={{ height: 8, backgroundColor: colors.surface2, borderRadius: 4, marginTop: spacing.md, overflow: "hidden" }}>
        <View style={{ width: `${Math.min(item.utilization, 100)}%`, height: 8, backgroundColor: tone }} />
      </View>

      <View style={{ backgroundColor: colors.surface2, borderRadius: 8, padding: 12, marginTop: spacing.md }}>
        <View style={sharedStyles.between}>
          <Text style={sharedStyles.muted}>Planned machine hrs</Text>
          <Text style={{ color: colors.text, fontWeight: "900" }}>{item.plannedHrs}</Text>
        </View>
        <View style={[sharedStyles.between, { marginTop: spacing.sm }]}>
          <Text style={sharedStyles.muted}>Completed machine hrs</Text>
          <Text style={{ color: colors.green, fontWeight: "900" }}>{item.completedHrs}</Text>
        </View>
        <View style={[sharedStyles.between, { marginTop: spacing.sm }]}>
          <Text style={sharedStyles.muted}>Pending machine hrs</Text>
          <Text style={{ color: tone, fontWeight: "900" }}>{item.pendingHrs}</Text>
        </View>
        <View style={[sharedStyles.between, { marginTop: spacing.sm }]}>
          <Text style={sharedStyles.muted}>Manpower utilization</Text>
          <Text style={{ color: colors.blue, fontWeight: "900" }}>{item.manpowerUtilization}%</Text>
        </View>
      </View>
    </View>
  );
}

export default function CustomerScreen() {
  const { tools } = useToolStore();

  const customers = useMemo(() => {
    const grouped = tools.reduce((acc, tool) => {
      const name = tool.customer || "Unknown";
      if (!acc[name]) {
        acc[name] = { name, total: 0, plannedHrs: 0, completedHrs: 0, pendingHrs: 0, plannedManHrs: 0, completedManHrs: 0, toolIds: [] };
      }

      acc[name].total += 1;
      acc[name].toolIds.push(tool.id);
      acc[name].plannedHrs += tool.plannedHrs;
      acc[name].completedHrs += tool.completedHrs;
      acc[name].pendingHrs += tool.pendingHrs;
      acc[name].plannedManHrs += tool.plannedManHrs;
      acc[name].completedManHrs += tool.completedManHrs;
      return acc;
    }, {});

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        plannedHrs: round(item.plannedHrs),
        completedHrs: round(item.completedHrs),
        pendingHrs: round(item.pendingHrs),
        utilization: item.plannedHrs ? round((item.completedHrs / item.plannedHrs) * 100) : 0,
        manpowerUtilization: item.plannedManHrs ? round((item.completedManHrs / item.plannedManHrs) * 100) : 0
      }))
      .sort((a, b) => b.pendingHrs - a.pendingHrs);
  }, [tools]);

  return (
    <View style={sharedStyles.screen}>
      <View style={sharedStyles.appHeader}>
        <Text style={sharedStyles.logoText}>CUSTOMERS</Text>
        <Text style={sharedStyles.logoSub}>Customer-wise production hours</Text>
      </View>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CustomerCard item={item} />}
        ListEmptyComponent={
          <View style={sharedStyles.card}>
            <Text style={{ color: colors.text, fontWeight: "900" }}>No customers found</Text>
            <Text style={[sharedStyles.muted, { marginTop: spacing.xs }]}>Customer data will appear once tools load.</Text>
          </View>
        }
        contentContainerStyle={sharedStyles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
