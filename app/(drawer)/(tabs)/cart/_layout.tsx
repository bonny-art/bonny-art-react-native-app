import { IconSymbol } from "@/shared/ui/IconSymbol";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { Stack } from "expo-router";

import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getCartStackOptions } from "@/navigation/cartOptions";

export default function CartStackLayout() {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        ...getCartStackOptions(scheme, insets.top),
        header: () => (
          <CompactHeader
            topInset={insets.top}
            bg={p.neutral.dark.darkest}
            accent={p.highlight.medium}
          />
        ),
      }}
    />
  );
}

function titleFor(name: string) {
  if (name === "index") return "Cart";
  if (name === "order") return "Order";
  if (name === "success") return "Success";
  return name;
}

function CompactHeader({
  topInset,
  bg,
  accent,
}: {
  topInset: number;
  bg: string;
  accent: string;
}) {
  const nav = useNavigation();
  const route = useRoute();
  const canBack = (nav as any)?.canGoBack?.() ?? false;

  const H = 44;
  const ICON = 22;

  return (
    <View style={{ backgroundColor: bg }}>
      <View
        style={{
          height: H,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 12,
        }}
      >
        {canBack ? (
          <TouchableOpacity
            onPress={() => (nav as any).goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={{
              width: ICON + 8,
              height: ICON + 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconSymbol name="chevron-left" size={ICON} color={accent} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: ICON + 8, height: ICON + 8 }} />
        )}

        <Text
          numberOfLines={1}
          style={{
            marginLeft: 8,
            fontSize: 18,
            fontWeight: "600",
            color: accent,
          }}
        >
          {titleFor(route.name)}
        </Text>
      </View>
    </View>
  );
}
