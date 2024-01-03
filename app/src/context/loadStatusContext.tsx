// context/loadStatusContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoadStatusContextType {
  loadStatus: { [key: string]: boolean };
  updateLoadStatus: (componentName: string, isLoaded: boolean) => void;
}

const LoadStatusContext = createContext<LoadStatusContextType | undefined>(
  undefined
);

export const LoadStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadStatus, setLoadStatus] = useState<{ [key: string]: boolean }>({});

  const updateLoadStatus = (componentName: string, isLoaded: boolean) => {
    setLoadStatus((prev) => ({ ...prev, [componentName]: isLoaded }));
  };

  return (
    <LoadStatusContext.Provider value={{ loadStatus, updateLoadStatus }}>
      {children}
    </LoadStatusContext.Provider>
  );
};

export const useLoadStatus = () => {
  const context = useContext(LoadStatusContext);
  if (!context) {
    throw new Error("useLoadStatus must be used within a LoadStatusProvider");
  }
  return context;
};
