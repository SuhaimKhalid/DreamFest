import { createContext } from "react";
import type { User } from "../Utilities/Type";

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextType | null>({
  currentUser: null,
  setCurrentUser: () => {},
});
