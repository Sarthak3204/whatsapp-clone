import { createContext, useContext, useState } from "react";

type ViewMode = "compact" | "spacious";

type ViewModeContextType = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
};

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("spacious");

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "compact" ? "spacious" : "compact"));
  };

  return (
    <ViewModeContext.Provider
      value={{
        viewMode,
        setViewMode,
        toggleViewMode,
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
