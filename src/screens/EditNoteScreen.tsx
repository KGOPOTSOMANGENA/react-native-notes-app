import React, { useContext, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Category } from "../types";
import Button from "../components/Button";
import Input from "../components/Input";
import { NotesContext } from "../context/NotesContext";

export default function EditNoteScreen({ route, navigation }: any) {
  const { updateNote, deleteNote } = useContext(NotesContext);
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
 const [category, setCategory] = useState<Category>(note.category);


  const onUpdate = () => {
    updateNote(note.id, { title, text, category });
    navigation.goBack();
  };

  const onDelete = () => {
    deleteNote(note.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Note ✏️</Text>

      <Input value={title} onChangeText={setTitle} placeholder="Title" />
      <Input value={text} onChangeText={setText} placeholder="Note text" />

      <Picker selectedValue={category} onValueChange={(value) => setCategory(value as Category)}>
        <Picker.Item label="Work" value="work" />
        <Picker.Item label="Study" value="study" />
        <Picker.Item label="Personal" value="personal" />
      </Picker>

      <Button title="Update Note" onPress={onUpdate} />

      <Button title="Delete Note" onPress={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
});
