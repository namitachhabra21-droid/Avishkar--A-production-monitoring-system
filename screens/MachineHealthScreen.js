import React from "react";
import { ScrollView, Text, View } from "react-native";
import { colors, loadColor, sharedStyles, spacing } from "../constants/theme";
import { useToolStore } from "../data/ToolStoreContext";

function StageCard({ item }) {
  const color = loadColor(item.utilization);
  return (
    <View style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 8, padding: spacing.md, marginBottom: spacing.md }}>
      <View style={sharedStyles.between}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text style={sharedStyles.cardTitle}>{item.stage}</Text>
          <Text style={[sharedStyles.muted, { marginTop: 3 }]}>{item.department} · {item.machine}</Text>
        </View>
        <View style={{ backgroundColor: `${color}22`, borderColor: `${color}66`, borderWidth: 1, borderRadius: 16, paddingHorizontal: 9, paddingVertical: 5 }}>
          <Text style={{ color, fontSize: 11, fontWeight: "900" }}>{item.utilization}%</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 8, marginTop: spacing.md }}>
        <View style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: 8, padding: 10 }}>
          <Text style={sharedStyles.muted}>Std Manpower</Text>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "900", marginTop: 3 }}>{item.manpower}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: 8, padding: 10 }}>
          <Text style={sharedStyles.muted}>Active Tools</Text>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "900", marginTop: 3 }}>{item.activeTools}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: colors.surface2, borderRadius: 8, padding: 10, marginTop: spacing.sm }}>
        <View style={sharedStyles.between}>
          <Text style={sharedStyles.muted}>Large / Medium / Small std hrs</Text>
          <Text style={{ color: colors.text, fontWeight: "900" }}>
            {item.standardHours.Large} / {item.standardHours.Medium} / {item.standardHours.Small}
          </Text>
        </View>
        <View style={[sharedStyles.between, { marginTop: spacing.sm }]}>
          <Text style={sharedStyles.muted}>Pending machine hrs</Text>
          <Text style={{ color: item.pendingHrs ? colors.warn : colors.green, fontWeight: "900" }}>{item.pendingHrs}</Text>
        </View>
        <View style={[sharedStyles.between, { marginTop: spacing.sm }]}>
          <Text style={sharedStyles.muted}>Pending man-hrs</Text>
          <Text style={{ color: item.pendingManHrs ? colors.warn : colors.green, fontWeight: "900" }}>{item.pendingManHrs}</Text>
        </View>
      </View>

      <Text style={{ color, fontSize: 12, fontWeight: "900", marginTop: spacing.sm }}>{item.decision}</Text>
    </View>
  );
}

export default function MachineHealthScreen() {
  const { dashboard } = useToolStore();

  return (
    <View style={sharedStyles.screen}>
      <View style={sharedStyles.appHeader}>
        <Text style={sharedStyles.logoText}>MACHINES</Text>
        <Text style={sharedStyles.logoSub}>Machine standards and allocation status</Text>
      </View>
      <ScrollView contentContainerStyle={sharedStyles.content} showsVerticalScrollIndicator={false}>
        {dashboard.stageSummary.map((item) => (
          <StageCard key={item.stage} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
