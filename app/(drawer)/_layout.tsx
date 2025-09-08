import React from "react";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileDrawerContent from "@/components/navigation/ProfileDrawerContent";

export default function DrawerLayout() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const insets = useSafeAreaInsets();
  const screenW = Dimensions.get("window").width;
  const drawerWidth = Math.min(screenW * 0.9, 420);

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerPosition: "left",
        swipeEdgeWidth: 100,
        overlayColor: "rgba(0,0,0,0.45)",
        drawerStyle: {
          width: drawerWidth,
          backgroundColor: p.neutral.dark.dark,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          paddingBottom: insets.bottom,
        },
      }}
      drawerContent={(props) => <ProfileDrawerContent {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
    </Drawer>
  );
}
