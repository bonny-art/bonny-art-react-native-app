import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AppProviders } from "@/providers/AppProviders";
import { SEGMENTS } from "@/navigation/routes";
import { ThemeProvider } from "@/providers/theme/ThemeContext";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [loaded] = useFonts({
    Marmelad: require("@shared/assets/fonts/Marmelad-Regular.ttf"),
    Comfortaa: require("@shared/assets/fonts/Comfortaa-VariableFont_wght.ttf"),
  });
  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppProviders>
          <Stack>
            <Stack.Screen
              name={SEGMENTS.DRAWER}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={SEGMENTS.MODALS}
              options={{ headerShown: false, presentation: "modal" }}
            />
            {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
          </Stack>
        </AppProviders>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
