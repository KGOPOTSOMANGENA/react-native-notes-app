import React, { useContext, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Input from "../components/Input";
import Button from "../components/Button";
import { NotesContext } from "../context/NotesContext";
import { Category } from "../types";


export default function AddNoteScreen({ navigation }: any) {
  const { addNote } = useContext(NotesContext);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("work");


  const onSave = () => {
    addNote({ title, text, category });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Note 📝</Text>

      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Input placeholder="Note text" value={text} onChangeText={setText} />

      <Picker selectedValue={category} onValueChange={(value) => setCategory(value as Category)}>
        <Picker.Item label="Work" value="work" />
        <Picker.Item label="Study" value="study" />
        <Picker.Item label="Personal" value="personal" />
      </Picker>

      <Button title="Save Note" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
});
