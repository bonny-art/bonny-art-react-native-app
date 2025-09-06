import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabsLayout() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];

  const inactive =
    scheme === "dark" ? p.neutral.light.dark : p.neutral.dark.dark;
  const active = p.highlight.medium;
  const bg =
    scheme === "dark" ? p.neutral.dark.darkest : p.neutral.light.darkest;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarStyle: { backgroundColor: bg, borderTopWidth: 0, height: 58 },
        headerStyle: { backgroundColor: bg },
        headerTintColor: active,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Horizontal",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="chevron-right" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="grid"
        options={{
          title: "Grid 2×N",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="filter" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
