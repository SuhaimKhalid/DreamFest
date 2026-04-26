import { createContext } from "react";
import type { Festival, User } from "../Utilities/Type";

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  all_fest: Festival[];
  setAll_fest: (all_fest: Festival[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
