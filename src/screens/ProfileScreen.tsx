import React, { useContext, useState } from "react";
import {
  View, Text, StyleSheet, Alert, ScrollView,
  TouchableOpacity, Platform,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

function confirm(message: string, onConfirm: () => void) {
  if (Platform.OS === "web") {
    if (window.confirm(message)) onConfirm();
  } else {
    Alert.alert("Confirm", message, [
      { text: "Cancel", style: "cancel" },
      { text: "OK", style: "destructive", onPress: onConfirm },
    ]);
  }
}

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    if (!username.trim()) {
      Platform.OS === "web"
        ? window.alert("Username cannot be empty.")
        : Alert.alert("Validation Error", "Username cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await updateProfile({
        username: username.trim(),
        ...(password.trim() ? { password } : {}),
      });
      Platform.OS === "web"
        ? window.alert("Profile updated successfully!")
        : Alert.alert("Success ✅", "Your profile has been updated.");
      setPassword("");
    } catch {
      Platform.OS === "web"
        ? window.alert("Something went wrong. Please try again.")
        : Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    confirm("Are you sure you want to log out?", logout);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        </View>
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>USERNAME</Text>
        <Input placeholder="Username" value={username} onChangeText={setUsername} />
        <Text style={styles.sectionLabel}>NEW PASSWORD</Text>
        <Input
          placeholder="Leave blank to keep current password"
          value={password}
          onChangeText={setPassword}
          secure
        />
      </View>

      <Button title={loading ? "Saving..." : "Save Changes"} onPress={onSave} style={{ marginTop: 8 }} />
      <Button title="Log Out" onPress={onLogout} variant="danger" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: "#fff" },
  avatarWrapper: { alignItems: "center", marginBottom: 32, marginTop: 16 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#1A1A1A",
    alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  avatarText: { fontSize: 32, color: "#fff", fontWeight: "700" },
  name: { fontSize: 20, fontWeight: "800", color: "#1A202C" },
  email: { fontSize: 14, color: "#718096", marginTop: 2 },
  section: { marginBottom: 8 },
  sectionLabel: {
    fontSize: 11, fontWeight: "700", color: "#A0AEC0",
    letterSpacing: 1.2, marginBottom: 6, marginTop: 12,
  },
});