import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="filter" />
      <Stack.Screen name="search" />
    </Stack>
  );
}
