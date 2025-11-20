import React, { createContext, useState, useEffect } from "react";
import { User } from "./../types";
import { saveData, loadData, removeData } from "../utils/storage";

interface AuthContextType {
  user: User | null;
  register: (u: User) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (u: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {},
  login: async () => false,
  logout: () => {},
  updateProfile: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  // Load logged in user
  useEffect(() => {
    (async () => {
      const storedUser = await loadData("user");
      if (storedUser) setUser(storedUser);
    })();
  }, []);

  const register = async (u: User) => {
    await saveData("user", u);
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    const storedUser = await loadData("user");
    if (!storedUser) return false;

    if (storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
  };

  const updateProfile = async (u: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...u };
    setUser(updated);
    await saveData("user", updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
