import { createContext, useContext, useState } from "react";
import type { SelectedUser } from "../types";

type SelectedUserContextType = {
  selectedUser: SelectedUser;
  setSelectedUser: (user: SelectedUser) => void;
};

const SelectedUserContext = createContext<SelectedUserContextType | undefined>(
  undefined
);

export function SelectedUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
}

export function useSelectedUser() {
  const context = useContext(SelectedUserContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedUser must be used within a SelectedUserProvider"
    );
  }
  return context;
}
