import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Marmelad: require("../assets/fonts/Marmelad-Regular.ttf"),
    Comfortaa: require("../assets/fonts/Comfortaa-VariableFont_wght.ttf"),
  });
  if (!loaded) return null;

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <Stack>
          {/* Drawer (всередині Tabs) — головний шлях */}
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          {/* Модалки поверх усього */}
          <Stack.Screen
            name="(modals)"
            options={{ headerShown: false, presentation: "modal" }}
          />
          {/* Авторизація (за потреби) */}
          {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
