import React, { useContext, useState } from "react";
import {
  View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter your password.");
      return;
    }
    setLoading(true);
    const success = await login(email.trim(), password);
    setLoading(false);
    if (!success) {
      Alert.alert("Login Failed", "Incorrect email or password. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>📝</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your notes</Text>

        <Input placeholder="Email address" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" value={password} onChangeText={setPassword} secure />

        <Button
          title={loading ? "Signing in..." : "Sign In"}
          onPress={onLogin}
          style={{ marginTop: 8 }}
        />

        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Don't have an account?{" "}
          <Text style={styles.linkBold}>Register</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  logo: { fontSize: 56, textAlign: "center", marginBottom: 16 },
  title: { fontSize: 28, fontWeight: "800", color: "#1A202C", textAlign: "center" },
  subtitle: { fontSize: 15, color: "#718096", textAlign: "center", marginBottom: 32, marginTop: 4 },
  link: { marginTop: 24, textAlign: "center", fontSize: 15, color: "#718096" },
  linkBold: { color: "#1A1A1A", fontWeight: "700" },
});