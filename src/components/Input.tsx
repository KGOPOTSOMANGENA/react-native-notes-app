import React, { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  multiline?: boolean;
}

export default function Input({ placeholder, value, onChangeText, secure, multiline }: Props) {
  const [hidden, setHidden] = useState(secure ?? false);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        placeholder={placeholder}
        placeholderTextColor="#A0A8B0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidden}
        multiline={multiline}
      />
      {secure && (
        <TouchableOpacity onPress={() => setHidden(!hidden)} style={styles.eye}>
          <Text style={styles.eyeText}>{hidden ? "👁" : "🙈"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "relative", marginBottom: 12 },
  input: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#F7F8FA",
    padding: 13,
    borderRadius: 12,
    fontSize: 15,
    color: "#1A202C",
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  eye: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  eyeText: { fontSize: 18 },
});