import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { ToolStoreProvider } from "./data/ToolStoreContext";
import DashboardScreen from "./screens/DashboardScreen";
import RunMonitorScreen from "./screens/RunMonitorScreen";
import MachineHealthScreen from "./screens/MachineHealthScreen";
import CustomerScreen from "./screens/CustomerScreen";
import AdminScreen from "./screens/AdminScreen";
import LoginScreen from "./screens/LoginScreen";
import { colors, sharedStyles, spacing } from "./constants/theme";

const Tab = createBottomTabNavigator();

const tabIcons = {
  Overview: "bar-chart-2",
  Tools: "tool",
  Machines: "cpu",
  Customers: "users",
  Admin: "settings"
};

function tabBarIcon(routeName, color, size) {
  return <Icon name={tabIcons[routeName]} size={size} color={color} />;
}

function MainTabs() {
  const { logout, profile } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              height: 72,
              paddingBottom: 12,
              paddingTop: 9
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "800",
              letterSpacing: 0
            },
            tabBarIcon: ({ color, size }) => tabBarIcon(route.name, color, size)
          })}
        >
          <Tab.Screen name="Overview" component={DashboardScreen} />
          <Tab.Screen name="Tools" component={RunMonitorScreen} />
          <Tab.Screen name="Machines" component={MachineHealthScreen} />
          <Tab.Screen name="Customers" component={CustomerScreen} />
          <Tab.Screen name="Admin" component={AdminScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      <Pressable
        onPress={logout}
        style={{
          position: "absolute",
          top: 28,
          right: 16,
          zIndex: 20,
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 7,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text style={{ color: colors.text, fontSize: 11, fontWeight: "900", marginRight: 6 }}>{profile.role}</Text>
        <Icon name="log-out" size={15} color={colors.accent} />
      </Pressable>
    </View>
  );
}

function AppGate() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <View style={[sharedStyles.screen, { alignItems: "center", justifyContent: "center", padding: spacing.xl }]}>
        <ActivityIndicator color={colors.accent} size="large" />
        <Text style={{ color: colors.muted, marginTop: spacing.md, fontWeight: "800" }}>Checking session...</Text>
      </View>
    );
  }

  return user ? <MainTabs /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToolStoreProvider>
        <AppGate />
      </ToolStoreProvider>
    </AuthProvider>
  );
}
