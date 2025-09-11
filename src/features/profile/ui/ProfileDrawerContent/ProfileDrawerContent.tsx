import { Pressable, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { IconSymbol } from "@shared/ui/IconSymbol";
import { UserAvatar } from "@shared/ui/UserAvatar";
import { makeStyles } from "./styles";
import { ICON_SIZE, HIT_SLOP } from "./constants";
import type { ProfileDrawerContentProps } from "./types";

export function ProfileDrawerContent({
  navigation,
}: ProfileDrawerContentProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.content}>
        <Text style={s.headerText}>Profile</Text>

        <View style={s.headerBlock}>
          <UserAvatar size="lg" showEditBadge />
          <Text style={s.userName} numberOfLines={1}>
            Svitlana
          </Text>
        </View>

        <Pressable
          hitSlop={HIT_SLOP}
          onPress={() => {
            navigation.navigate("(tabs)", { screen: "favorites" } as never);
            navigation.closeDrawer();
          }}
          style={s.itemRow}
          accessibilityRole="button"
          accessibilityLabel="Go to favorites"
        >
          <IconSymbol
            name="heart"
            color={palette[scheme].highlight.medium}
            size={ICON_SIZE}
          />
          <Text style={s.itemText}>Favorites</Text>
        </Pressable>

        {/* Роздільник після першого пункту */}
        <View style={s.divider} />

        {/* Приклад для майбутніх пунктів меню:
        <Pressable
          hitSlop={HIT_SLOP}
          onPress={() => {
            navigation.navigate('(tabs)', { screen: 'profile' } as never);
            navigation.closeDrawer();
          }}
          style={s.itemRow}
          accessibilityRole="button"
          accessibilityLabel="Go to personal data"
        >
          <IconSymbol name="user" color={palette[scheme].highlight.medium} size={ICON_SIZE} />
          <Text style={s.itemText}>Personal data</Text>
        </Pressable>
        */}

        {/* Приклад для Logout:
        <View style={{ marginTop: 24 }}>
          <Pressable onPress={logout}>
            <Text style={{ color: palette[scheme].highlight.medium, fontWeight: '700' }}>
              Log out
            </Text>
          </Pressable>
        </View>
        */}
      </View>
    </View>
  );
}
