import { ReactNode, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/providers/theme/ThemeContext";

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  const { currentTheme } = useTheme();
  const theme = useMemo(
    () => (currentTheme === "dark" ? DarkTheme : DefaultTheme),
    [currentTheme]
  );

  return (
    <SafeAreaProvider>
      <NavigationThemeProvider value={theme}>
        {children}
        <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
      </NavigationThemeProvider>
    </SafeAreaProvider>
  );
}
