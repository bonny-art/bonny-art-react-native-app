import React from "react";
import { Tabs } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabsLayout() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const active = p.highlight.medium;
  const inactive =
    scheme === "dark" ? p.neutral.light.dark : p.neutral.dark.dark;
  const bg =
    scheme === "dark" ? p.neutral.dark.darkest : p.neutral.light.darkest;

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: insets.top,
      }}
      edges={["left", "right"]}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: active,
          tabBarInactiveTintColor: inactive,
          tabBarStyle: {
            backgroundColor: bg,
            borderTopWidth: 0,
            height: 56 + insets.bottom,
            paddingBottom: Math.max(insets.bottom, 0),
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="search" color={color} size={size} />
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
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="cart" color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate(
                "(tabs)" as never,
                {
                  screen: "cart",
                  params: { screen: "index" },
                } as never
              );
            },
          })}
        />
        {/* Псевдо-таб: відкриває Drawer */}
        <Tabs.Screen
          name="profile-trigger"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <IconSymbol name="user" color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              (navigation.getParent() as any)?.openDrawer?.();
            },
          })}
        />

        {/* Сховати групу category з таб-бару */}
        <Tabs.Screen name="category" options={{ href: null }} />
      </Tabs>
    </SafeAreaView>
  );
}
