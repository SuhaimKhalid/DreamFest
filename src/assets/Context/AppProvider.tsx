import { AppContext } from "./AppContext";
import type { Festival, User } from "../Utilities/Type";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [all_fest, setAll_fest] = useState<Festival[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("CurrentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedFestivals = localStorage.getItem("Festivals");
    if (savedFestivals) {
      setAll_fest(JSON.parse(savedFestivals));
    }
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{ currentUser, setCurrentUser, all_fest, setAll_fest }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
