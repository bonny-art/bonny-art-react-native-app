import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View, Text, Pressable } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { spacing } from "@/constants/tokens";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileDrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        gap: spacing.lg,
        backgroundColor: p.neutral.dark.dark,
      }}
    >
      <Text
        style={{
          color: p.neutral.light.lightest,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Profile
      </Text>

      <Pressable
        onPress={() => {
          navigation.navigate("(tabs)", { screen: "favorites" } as never); // <—
          navigation.closeDrawer();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 8,
        }}
      >
        <IconSymbol name="heart" color={p.highlight.medium} size={20} />
        <Text style={{ color: p.neutral.light.lightest, fontSize: 14 }}>
          Favorites
        </Text>
      </Pressable>

      {/* <Pressable
        onPress={() => {
          navigation.navigate("(tabs)", { screen: "profile" } as never); // <—
          navigation.closeDrawer();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 8,
        }}
      >
        <IconSymbol name="user" color={p.highlight.medium} size={20} />
        <Text style={{ color: p.neutral.light.lightest, fontSize: 14 }}>
          Personal data
        </Text>
      </Pressable> */}

      {/*<View style={{ marginTop: spacing.xl }}>
        <Pressable
          onPress={() => {
            /* TODO: logout()
          }}
        >
          <Text style={{ color: p.highlight.medium, fontWeight: "700" }}>
            Log out
          </Text>
        </Pressable>
      </View> */}
    </View>
  );
}
