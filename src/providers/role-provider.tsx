"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type RoleContextType = {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({
  children,
  initialRole,
}: {
  children: ReactNode;
  initialRole: string;
}) {
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);

  return (
    <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
