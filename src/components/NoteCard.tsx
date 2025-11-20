import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Note } from "./../types";

interface Props {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{note.title || "Untitled"}</Text>
      <Text numberOfLines={2}>{note.text}</Text>
      <Text style={styles.date}>
        {new Date(note.dateAdded).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", marginBottom: 6 },
  date: { fontSize: 12, marginTop: 4, color: "gray" },
});
