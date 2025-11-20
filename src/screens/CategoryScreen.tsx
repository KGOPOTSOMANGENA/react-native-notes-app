import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { NotesContext } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

export default function CategoryScreen({ navigation }: any) {
  const { notes } = useContext(NotesContext);

  const categories = ["work", "study", "personal"] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories 📂</Text>

      {categories.map((cat) => (
        <View key={cat}>
          <Text style={styles.categoryTitle}>{cat.toUpperCase()}</Text>

          <FlatList
            data={notes.filter((n) => n.category === cat)}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onPress={() => navigation.navigate("EditNote", { note: item })}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  categoryTitle: { fontSize: 20, fontWeight: "600", marginVertical: 10 },
});
