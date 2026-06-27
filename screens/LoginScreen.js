import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { signInWithEmailAndPassword } from "firebase/auth";
import { colors, sharedStyles, spacing } from "../constants/theme";
import { auth, hasFirebaseConfig } from "../firebase";
import { useAuth } from "../auth/AuthContext";

export default function LoginScreen() {
  const { demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!hasFirebaseConfig || !auth) {
      setError("Firebase config missing. Create a .env file with EXPO_PUBLIC_FIREBASE_* values.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(err.message || "Could not login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={sharedStyles.screen}>
      <View style={{ flex: 1, justifyContent: "center", padding: spacing.lg }}>
        <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
          <View style={[sharedStyles.logoIcon, { width: 52, height: 52, borderRadius: 12 }]}>
            <Icon name="settings" size={26} color={colors.white} />
          </View>
          <Text style={[sharedStyles.logoText, { marginTop: spacing.md, fontSize: 30 }]}>AVISHKAR</Text>
          <Text style={sharedStyles.logoSub}>Factory Manager Dashboard</Text>
        </View>

        <View style={sharedStyles.card}>
          <Text style={sharedStyles.sectionTitle}>Login</Text>
          {!hasFirebaseConfig ? (
            <View style={{ backgroundColor: `${colors.warn}18`, borderColor: `${colors.warn}66`, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: spacing.md }}>
              <Text style={{ color: colors.warn, fontWeight: "900" }}>Demo mode available</Text>
              <Text style={[sharedStyles.muted, { marginTop: spacing.xs }]}>Firebase config is missing, so use demo mode to see tools and screens with sample data.</Text>
            </View>
          ) : null}
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={colors.muted}
            style={inputStyle}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={colors.muted}
            style={[inputStyle, { marginTop: spacing.sm }]}
          />
          {error ? <Text style={{ color: colors.danger, marginTop: spacing.sm }}>{error}</Text> : null}
          <Pressable
            onPress={handleLogin}
            disabled={loading || !email || !password}
            style={{
              marginTop: spacing.md,
              backgroundColor: loading || !email || !password ? colors.border : colors.accent,
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: "center"
            }}
          >
            {loading ? <ActivityIndicator color={colors.white} /> : <Text style={{ color: colors.white, fontWeight: "900" }}>Login</Text>}
          </Pressable>
          {!hasFirebaseConfig ? (
            <Pressable
              onPress={demoLogin}
              style={{
                marginTop: spacing.sm,
                backgroundColor: colors.surface2,
                borderColor: colors.accent,
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 14,
                alignItems: "center"
              }}
            >
              <Text style={{ color: colors.accent, fontWeight: "900" }}>Open Demo Dashboard</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const inputStyle = {
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: colors.surface2,
  color: colors.text,
  paddingHorizontal: 12,
  paddingVertical: 13
};
