export interface User {
  email: string;
  username: string;
  password: string;
}

export type Category = "work" | "study" | "personal";

export interface Note {
  id: string;
  title?: string;
  text: string;
  category: Category;
  dateAdded: string;
  lastUpdated?: string;
}
