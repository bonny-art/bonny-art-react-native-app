import { Tabs } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { getTabsOptions } from "@/navigation/tabsOptions";

export default function TabsLayout() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
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
      <Tabs screenOptions={getTabsOptions(scheme, insets)}>
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
                { screen: "cart", params: { screen: "index" } } as never
              );
            },
          })}
        />
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
        {/* ховаємо групу category з таб-бару */}
        <Tabs.Screen name="category" options={{ href: null }} />
      </Tabs>
    </SafeAreaView>
  );
}
