import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useContext(AuthContext);

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState(user?.password || "");

  const onSave = async () => {
    await updateProfile({ username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile 👤</Text>

      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secure />

      <Button title="Save Changes" onPress={onSave} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
});
