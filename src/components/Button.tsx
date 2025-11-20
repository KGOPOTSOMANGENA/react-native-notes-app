import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string; // optional custom color
  textColor?: string;       // optional custom text color
  style?: object;           // optional extra styles
}

export default function Button({ title, onPress, backgroundColor, textColor, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: backgroundColor || "#333" }, style]}
      onPress={onPress}
      activeOpacity={0.7} // subtle feedback when pressed
    >
      <Text style={[styles.text, { color: textColor || "#fff" }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
