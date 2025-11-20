import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { NotesContext } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";
import Button from "../components/Button";

export default function NotesListScreen({ navigation }: any) {
  const { notes, searchNotes, sortNotesByDate } = useContext(NotesContext);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Apply search and sorting
  const filteredNotes = search ? searchNotes(search) : notes;
  const sortedNotes = sortNotesByDate(sortOrder).filter((note) =>
    filteredNotes.some((n) => n.id === note.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Notes 📝</Text>

      {/* Search bar */}
      <TextInput
        placeholder="Search notes..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* Sorting buttons stacked vertically */}
      <View style={styles.sortButtons}>
        <Button
          title="Sort Asc"
          onPress={() => setSortOrder("asc")}
          backgroundColor="#4CAF50"
          style={{ marginBottom: 10 }}
        />
        <Button
          title="Sort Desc"
          onPress={() => setSortOrder("desc")}
          backgroundColor="#F44336"
        />
      </View>

      {/* Notes list */}
      <FlatList
        data={sortedNotes}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate("EditNote", { note: item })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 140 }} // space for floating button
      />

      {/* Floating Add Note button */}
      <View style={styles.addButton}>
        <Button
          title="Add Note"
          onPress={() => navigation.navigate("AddNote")}
          backgroundColor="#2196F3"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  sortButtons: {
    flexDirection: "column", // stack vertically
    marginBottom: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
