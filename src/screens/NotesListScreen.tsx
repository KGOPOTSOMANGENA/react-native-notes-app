import React, { useContext, useState } from "react";
import {
  View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity,
} from "react-native";
import { NotesContext } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

export default function NotesListScreen({ navigation }: any) {
  const { notes, searchNotes, sortNotesByDate } = useContext(NotesContext);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredNotes = search.trim() ? searchNotes(search) : notes;
  const displayedNotes = sortNotesByDate(sortOrder).filter((note) =>
    filteredNotes.some((n) => n.id === note.id)
  );

  const toggleSort = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Notes</Text>
        <TouchableOpacity onPress={toggleSort} style={styles.sortBtn}>
          <Text style={styles.sortIcon}>{sortOrder === "desc" ? "↓" : "↑"}</Text>
          <Text style={styles.sortLabel}>{sortOrder === "desc" ? "Newest" : "Oldest"}</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search by title or content..."
          placeholderTextColor="#A0A8B0"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {!!search && (
          <TouchableOpacity onPress={() => setSearch("")} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notes */}
      <FlatList
        data={displayedNotes}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate("EditNote", { note: item })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>
              {search ? "No notes match your search" : "No notes yet"}
            </Text>
            <Text style={styles.emptySub}>
              {search ? "Try searching by title or note content" : "Tap + to add your first note"}
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddNote")}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA", paddingHorizontal: 16, paddingTop: 52 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  header: { fontSize: 28, fontWeight: "800", color: "#1A202C" },
  sortBtn: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#FFFFFF", paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1.5, borderColor: "#E2E8F0",
  },
  sortIcon: { fontSize: 14, fontWeight: "700", color: "#1A202C" },
  sortLabel: { fontSize: 13, fontWeight: "600", color: "#718096" },
  searchWrapper: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#FFFFFF", borderRadius: 12,
    borderWidth: 1.5, borderColor: "#E2E8F0",
    paddingHorizontal: 12, marginBottom: 16,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: "#1A202C" },
  clearBtn: { padding: 4 },
  clearText: { fontSize: 14, color: "#A0A8B0" },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: "#2D3748", marginBottom: 6 },
  emptySub: { fontSize: 14, color: "#718096", textAlign: "center" },
  fab: {
    position: "absolute", bottom: 28, right: 24,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: "#1A1A1A",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 6,
  },
  fabIcon: { fontSize: 28, color: "#fff", lineHeight: 32 },
});