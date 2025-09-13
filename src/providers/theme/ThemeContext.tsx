import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "appTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === "light" || stored === "dark") {
          setCurrentTheme(stored);
        }
      })
      .catch(() => {
        /* ignore */
      });
  }, []);

  const toggleTheme = () =>
    setCurrentTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
        /* ignore */
      });
      return next;
    });

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
