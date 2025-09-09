import { SEGMENTS } from "@/navigation/routes";
import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
      <Stack.Screen name={SEGMENTS.MODALS_PRODUCT_ID} />
      <Stack.Screen name={SEGMENTS.FILTER} />
      <Stack.Screen name={SEGMENTS.SEARCH} />
    </Stack>
  );
}
