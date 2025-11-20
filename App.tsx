import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { NotesProvider } from "./src/context/NotesContext";
import RootNavigation from "./src/navigation";

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <RootNavigation />
      </NotesProvider>
    </AuthProvider>
  );
}

