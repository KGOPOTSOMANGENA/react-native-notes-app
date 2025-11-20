import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    await register({ email, username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account ✨</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secure
      />

      <Button title="Register" onPress={onRegister} />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30 },
  link: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
    fontSize: 16,
  },
});
