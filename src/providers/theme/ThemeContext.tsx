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

/**
 * Provides theme context with persistence support for the entire app tree.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  useEffect(() => {
    let isMounted = true;

    const loadStoredTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!isMounted) {
          return;
        }
        if (stored === "light" || stored === "dark") {
          setCurrentTheme(stored);
        }
      } catch (error) {
        console.error("Failed to read theme from storage", error);
      }
    };

    loadStoredTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = () =>
    setCurrentTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      AsyncStorage.setItem(STORAGE_KEY, next).catch((error) => {
        console.error("Failed to persist theme", error);
      });
      return next;
    });

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Returns the current theme context, ensuring the hook is used within the provider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeContext };
