import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from "react-native";

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "danger" | "ghost";
  style?: ViewStyle;
}

export default function Button({ title, onPress, variant = "primary", style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 6,
  },
  primary: {
    backgroundColor: "#1A1A1A",
  },
  danger: {
    backgroundColor: "#FF3B30",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#1A1A1A",
  },
  text: {
    fontWeight: "700",
    fontSize: 15,
    color: "#FFFFFF",
  },
  ghostText: {
    color: "#1A1A1A",
  },
});