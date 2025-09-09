import { ReactNode, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@shared/hooks/useColorScheme";

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  const scheme = useColorScheme() ?? "light";
  const theme = useMemo(
    () => (scheme === "dark" ? DarkTheme : DefaultTheme),
    [scheme]
  );

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        {children}
        <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
