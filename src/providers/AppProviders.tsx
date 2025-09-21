import { ReactNode, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/providers/theme/ThemeContext";

import { Provider } from "react-redux";
import { store } from "@/store";

type Props = { children: ReactNode };

/**
 * Wraps the application with core providers: Redux, safe area, navigation, and status bar.
 */
export function AppProviders({ children }: Props) {
  const { currentTheme } = useTheme();
  const theme = useMemo(
    () => (currentTheme === "dark" ? DarkTheme : DefaultTheme),
    [currentTheme]
  );

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationThemeProvider value={theme}>
          {children}
          <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
        </NavigationThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
