import React, { useContext, useState } from "react";
import {
  View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }
    if (!username.trim()) {
      Alert.alert("Validation Error", "Please enter a username.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters.");
      return;
    }
    await register({ email: email.trim(), username: username.trim(), password });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>✨</Text>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start capturing your thoughts</Text>

        <Input placeholder="Email address" value={email} onChangeText={setEmail} />
        <Input placeholder="Username" value={username} onChangeText={setUsername} />
        <Input placeholder="Password (min 6 characters)" value={password} onChangeText={setPassword} secure />

        <Button title="Create Account" onPress={onRegister} style={{ marginTop: 8 }} />

        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Already have an account?{" "}
          <Text style={styles.linkBold}>Sign In</Text>
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