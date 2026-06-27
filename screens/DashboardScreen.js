import React from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, sharedStyles, spacing } from "../constants/theme";
import { useToolStore } from "../data/ToolStoreContext";

function Header() {
  return (
    <View style={sharedStyles.appHeader}>
      <View style={sharedStyles.logoRow}>
        <View style={sharedStyles.row}>
          <View style={sharedStyles.logoIcon}>
            <Icon name="settings" size={20} color={colors.white} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={sharedStyles.logoText}>AVISHKAR</Text>
            <Text style={sharedStyles.logoSub}>Tool Review Summary</Text>
          </View>
        </View>
        <View style={sharedStyles.livePill}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.green }} />
          <Text style={{ color: colors.green, fontSize: 11, fontWeight: "800" }}>LIVE</Text>
        </View>
      </View>
    </View>
  );
}

function StageCircles({ tool, stageStandards }) {
  return (
    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
      {stageStandards.map((stage) => {
        const row = tool.stageRows.find((item) => item.stage === stage.stage);
        const done = row?.pendingMachineHrs <= 0;
        const active = tool.currentStage === stage.stage;
        const blocked = active && row?.pendingMachineHrs > 0;
        const circleColor = done ? colors.green : blocked ? colors.danger : active ? colors.warn : colors.border;
        return (
          <View
            key={stage.stage}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 1.5,
              borderColor: circleColor,
              backgroundColor: done || active ? circleColor : "transparent"
            }}
          />
        );
      })}
    </View>
  );
}

function ToolReviewTable({ tools, stageStandards, onOpenTool }) {
  const headerCell = [sharedStyles.muted, { fontWeight: "900" }];

  return (
    <View style={[sharedStyles.card, { paddingHorizontal: 0, paddingBottom: 0 }]}>
      <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}>
        <Text style={sharedStyles.sectionTitle}>Tool Review</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ minWidth: "100%" }}>
        <View style={{ width: "100%", minWidth: 980, borderTopColor: colors.border, borderTopWidth: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.surface2 }}>
            <Text style={[headerCell, { width: 84 }]}>Tool</Text>
            <Text style={[headerCell, { flex: 1.5, minWidth: 170 }]}>Tool Name</Text>
            <Text style={[headerCell, { flex: 1, minWidth: 110 }]}>Type</Text>
            <Text style={[headerCell, { flex: 1.1, minWidth: 150 }]}>Customer</Text>
            <Text style={[headerCell, { width: 210 }]}>Stages</Text>
            <Text style={[headerCell, { width: 130 }]}>Current Stage</Text>
            <Text style={[headerCell, { width: 90, textAlign: "right" }]}>Status</Text>
          </View>
          {tools.map((tool) => {
            const statusColor = tool.status === "Completed" ? colors.green : tool.status === "Pending" ? colors.warn : colors.accent;
            return (
              <Pressable
                key={tool.firestoreId || tool.id}
                onPress={() => onOpenTool(tool)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: spacing.md,
                  paddingVertical: 13,
                  borderTopColor: colors.border,
                  borderTopWidth: 1,
                  opacity: pressed ? 0.75 : 1
                })}
              >
                <Text style={{ color: colors.accent, width: 84, fontWeight: "900" }}>{tool.id}</Text>
                <Text style={{ color: colors.text, flex: 1.5, minWidth: 170, fontWeight: "800" }} numberOfLines={1}>{tool.name || "-"}</Text>
                <Text style={{ color: colors.muted, flex: 1, minWidth: 110, fontSize: 12, fontWeight: "800" }}>{tool.size || tool.toolType || "-"}</Text>
                <Text style={{ color: colors.text, flex: 1.1, minWidth: 150, fontSize: 12, fontWeight: "700" }} numberOfLines={1}>{tool.customer || "-"}</Text>
                <View style={{ width: 210 }}>
                  <StageCircles tool={tool} stageStandards={stageStandards} />
                  <Text style={[sharedStyles.muted, { marginTop: 5 }]}>{tool.progress || 0}/{stageStandards.length} complete</Text>
                </View>
                <Text style={{ color: tool.currentStage === "No Active Stage" ? colors.muted : colors.warn, width: 130, fontSize: 12, fontWeight: "800" }} numberOfLines={1}>
                  {tool.currentStage || "-"}
                </Text>
                <View style={{ width: 90, alignItems: "flex-end" }}>
                  <Text style={{ color: statusColor, fontSize: 11, fontWeight: "900" }} numberOfLines={1}>{tool.status || "-"}</Text>
                  <Icon name="chevron-right" color={colors.muted} size={15} />
                </View>
              </Pressable>
            );
          })}
          {!tools.length ? (
            <View style={{ padding: spacing.md }}>
              <Text style={sharedStyles.muted}>No tools found in current scope.</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default function DashboardScreen({ navigation }) {
  const { tools, stageStandards, loading, error } = useToolStore();

  return (
    <View style={sharedStyles.screen}>
      <Header />
      <ScrollView contentContainerStyle={sharedStyles.content} showsVerticalScrollIndicator={false}>
        {loading && !tools.length ? (
          <View style={[sharedStyles.card, { marginBottom: spacing.md, alignItems: "center" }]}>
            <ActivityIndicator color={colors.accent} />
            <Text style={[sharedStyles.muted, { marginTop: spacing.sm }]}>Syncing tool review...</Text>
          </View>
        ) : null}

        {error ? (
          <View style={[sharedStyles.card, { marginBottom: spacing.md, borderColor: colors.danger }]}>
            <Text style={{ color: colors.danger, fontWeight: "900" }}>Tool review error</Text>
            <Text style={[sharedStyles.muted, { marginTop: spacing.xs }]}>{error}</Text>
          </View>
        ) : null}

        <ToolReviewTable
          tools={tools}
          stageStandards={stageStandards}
          onOpenTool={(tool) => navigation.navigate("Tools", { toolId: tool.firestoreId || tool.id })}
        />
      </ScrollView>
    </View>
  );
}
