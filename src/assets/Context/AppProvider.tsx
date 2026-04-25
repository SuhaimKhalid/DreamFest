import { AppContext } from "./AppContext";
import type { User } from "../Utilities/Type";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("CurrentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </AppContext.Provider>
    </>
  );
};
