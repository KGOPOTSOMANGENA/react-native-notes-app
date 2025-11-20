import React, { createContext, useEffect, useState } from "react";
import { Note } from "./../types";
import uuid from "react-native-uuid";
import { saveData, loadData } from "../utils/storage";

interface NotesContextType {
  notes: Note[];
  addNote: (n: Omit<Note, "id" | "dateAdded">) => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  searchNotes: (term: string) => Note[];
  sortNotesByDate: (order: "asc" | "desc") => Note[];
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  searchNotes: () => [],
  sortNotesByDate: () => [],
});

export const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await loadData("notes");
    if (saved) setNotes(saved);
  };

  const saveNotes = async (updated: Note[]) => {
    setNotes(updated);
    await saveData("notes", updated);
  };

  const addNote = (n: Omit<Note, "id" | "dateAdded">) => {
    const newNote: Note = {
      id: uuid.v4().toString(),
      dateAdded: new Date().toISOString(),
      ...n,
    };
    saveNotes([...notes, newNote]);
  };

  const updateNote = (id: string, data: Partial<Note>) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, ...data, lastUpdated: new Date().toISOString() } : n
    );
    saveNotes(updated);
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  const searchNotes = (term: string) => {
    return notes.filter((n) =>
      n.text.toLowerCase().includes(term.toLowerCase())
    );
  };

  const sortNotesByDate = (order: "asc" | "desc") => {
    return [...notes].sort((a, b) =>
      order === "asc"
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    );
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, searchNotes, sortNotesByDate }}
    >
      {children}
    </NotesContext.Provider>
  );
};
