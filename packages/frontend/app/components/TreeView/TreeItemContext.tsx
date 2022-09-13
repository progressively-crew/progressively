import React, { createContext, useContext, useId } from "react";

const TreeItemContext = createContext("");

export const TreeItemProvider = ({ children }: { children: React.ReactNode }) => {
  const id = useId();

  return <TreeItemContext.Provider value={id}>{children}</TreeItemContext.Provider>;
};

export const useTreeItem = () => useContext(TreeItemContext);
