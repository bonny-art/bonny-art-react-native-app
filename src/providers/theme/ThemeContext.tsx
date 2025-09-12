import { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(scheme ?? "light");

  const toggleTheme = () =>
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeContext };
