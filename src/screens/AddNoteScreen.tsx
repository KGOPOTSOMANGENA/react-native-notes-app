import React, { useContext, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, ScrollView, Platform,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { NotesContext } from "../context/NotesContext";
import { Category } from "../types";

const CATEGORIES: { label: string; value: Category; emoji: string }[] = [
  { label: "Work", value: "work", emoji: "💼" },
  { label: "Study", value: "study", emoji: "📚" },
  { label: "Personal", value: "personal", emoji: "🌿" },
];

export default function AddNoteScreen({ navigation }: any) {
  const { addNote } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("personal");

  const onSave = () => {
    if (!text.trim()) {
      if (Platform.OS === "web") window.alert("Note content cannot be empty.");
      else Alert.alert("Validation Error", "Note content cannot be empty.");
      return;
    }
    addNote({ title, text, category });
    if (Platform.OS === "web") {
      window.alert("Note added successfully!");
      navigation.goBack();
    } else {
      Alert.alert("Note Added ✅", "Your note has been saved.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>New Note</Text>

      <Text style={styles.label}>TITLE</Text>
      <Input placeholder="Give your note a title..." value={title} onChangeText={setTitle} />

      <Text style={styles.label}>CONTENT</Text>
      <Input placeholder="Write your note here..." value={text} onChangeText={setText} multiline />

      <Text style={styles.label}>CATEGORY</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setCategory(cat.value)}
            style={[styles.catChip, category === cat.value && styles.catChipActive]}
          >
            <Text style={styles.catEmoji}>{cat.emoji}</Text>
            <Text style={[styles.catLabel, category === cat.value && styles.catLabelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Note" onPress={onSave} style={{ marginTop: 16 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: "#fff" },
  backBtn: { marginBottom: 16 },
  backText: { fontSize: 15, color: "#718096", fontWeight: "600" },
  header: { fontSize: 28, fontWeight: "800", color: "#1A202C", marginBottom: 24 },
  label: { fontSize: 11, fontWeight: "700", color: "#A0AEC0", letterSpacing: 1.2, marginBottom: 8, marginTop: 4 },
  categoryRow: { flexDirection: "row", gap: 10 },
  catChip: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 6, paddingVertical: 10, borderRadius: 12,
    backgroundColor: "#F7F8FA", borderWidth: 1.5, borderColor: "transparent",
  },
  catChipActive: { backgroundColor: "#1A1A1A", borderColor: "#1A1A1A" },
  catEmoji: { fontSize: 16 },
  catLabel: { fontSize: 14, fontWeight: "600", color: "#718096" },
  catLabelActive: { color: "#FFFFFF" },
});