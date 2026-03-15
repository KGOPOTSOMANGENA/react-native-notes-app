import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Note } from "../types";

interface Props {
  note: Note;
  onPress: () => void;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  work:     { bg: "#FFF7E6", text: "#92600a" },
  study:    { bg: "#E8F8F0", text: "#1a7a47" },
  personal: { bg: "#EEF4FF", text: "#2a52be" },
};

export default function NoteCard({ note, onPress }: Props) {
  const cat = CATEGORY_STYLES[note.category] ?? CATEGORY_STYLES.personal;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || "Untitled"}
        </Text>
        <View style={[styles.categoryPill, { backgroundColor: cat.bg }]}>
          <Text style={[styles.categoryText, { color: cat.text }]}>
            {note.category}
          </Text>
        </View>
      </View>
      <Text style={styles.body} numberOfLines={2}>{note.text}</Text>
      <Text style={styles.date}>{new Date(note.dateAdded).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontWeight: "700", fontSize: 15, color: "#1A202C", flex: 1, marginRight: 8 },
  body: { fontSize: 14, color: "#718096", lineHeight: 20, marginBottom: 10 },
  date: { fontSize: 12, color: "#A0AEC0" },
  categoryPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: { fontSize: 11, fontWeight: "700" },
});