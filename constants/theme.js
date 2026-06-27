import { StyleSheet } from "react-native";

export const colors = {
  bg: "#F6F8FB",
  surface: "#FFFFFF",
  surface2: "#EEF3F8",
  card: "#FFFFFF",
  border: "#D8E0EA",
  accent: "#2563EB",
  accentDark: "#1D4ED8",
  blue: "#0EA5E9",
  green: "#059669",
  warn: "#D97706",
  danger: "#DC2626",
  text: "#172033",
  muted: "#66758A",
  white: "#FFFFFF"
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28
};

export const chartConfig = {
  backgroundGradientFrom: colors.card,
  backgroundGradientTo: colors.card,
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(102, 117, 138, ${opacity})`,
  decimalPlaces: 0,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: colors.accent
  },
  propsForBackgroundLines: {
    stroke: colors.border
  },
  barPercentage: 0.58
};

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg
  },
  content: {
    padding: spacing.md,
    paddingBottom: 96
  },
  appHeader: {
    backgroundColor: colors.surface,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0
  },
  logoSub: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginTop: 2
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface2,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  sectionTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: spacing.md
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  muted: {
    color: colors.muted,
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export function statusColor(status) {
  if (status === "Completed") return colors.green;
  if (status === "Running") return colors.accent;
  if (status === "Done") return colors.green;
  if (status === "Delayed") return colors.danger;
  if (status === "Pending") return colors.warn;
  return colors.accent;
}

export function loadColor(load) {
  if (load >= 85) return colors.danger;
  if (load >= 70) return colors.warn;
  if (load >= 60) return colors.blue;
  return colors.green;
}
