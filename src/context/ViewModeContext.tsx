import { createContext, useContext, useState, useEffect } from "react";

type ViewMode = "compact" | "spacious";

type ViewModeContextType = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
};

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "whatsapp-view-mode";

const loadViewModeFromStorage = (): ViewMode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "compact" || stored === "spacious")) {
      return stored as ViewMode;
    }
  } catch (error) {
    console.error("Failed to load view mode from storage:", error);
  }
  return "spacious";
};

const saveViewModeToStorage = (viewMode: ViewMode): void => {
  try {
    localStorage.setItem(STORAGE_KEY, viewMode);
  } catch (error) {
    console.error("Failed to save view mode to storage:", error);
  }
};

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>(loadViewModeFromStorage());

  useEffect(() => {
    saveViewModeToStorage(viewMode);
  }, [viewMode]);

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
