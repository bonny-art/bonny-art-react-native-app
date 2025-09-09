import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout() {
  const [loaded] = useFonts({
    Marmelad: require("@shared/assets/fonts/Marmelad-Regular.ttf"),
    Comfortaa: require("@shared/assets/fonts/Comfortaa-VariableFont_wght.ttf"),
  });
  if (!loaded) return null;

  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)"
          options={{ headerShown: false, presentation: "modal" }}
        />
        {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
      </Stack>
    </AppProviders>
  );
}
