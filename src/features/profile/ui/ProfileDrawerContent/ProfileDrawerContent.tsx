import { Alert, Pressable, Switch, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { IconSymbol } from "@shared/ui/IconSymbol";
import { UserAvatar } from "@shared/ui/UserAvatar";
import { makeStyles } from "./styles";
import { ICON_SIZE, HIT_SLOP } from "./constants";
import type { ProfileDrawerContentProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { logout } from "@/store/authSlice";
import type { AppDispatch } from "@/store";

export function ProfileDrawerContent({
  navigation,
}: ProfileDrawerContentProps) {
  const { currentTheme, toggleTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const s = makeStyles(scheme);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleFavorites = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Sign in required",
        "Log in or register to view your favorites."
      );
      return;
    }
    navigation.navigate("(tabs)", { screen: "favorites" } as never);
    navigation.closeDrawer();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.closeDrawer();
  };

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.content}>
        <Text style={s.headerText}>Profile</Text>

        <View style={s.headerBlock}>
          <UserAvatar size="lg" showEditBadge />
          <Text style={s.userName} numberOfLines={1}>
            {user?.name ?? "Guest"}
          </Text>
        </View>

        <Pressable
          hitSlop={HIT_SLOP}
          onPress={handleFavorites}
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

        <View style={s.divider} />

        <View style={s.switchRow}>
          <Text style={s.itemText}>Dark theme</Text>
          <Switch
            value={scheme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{
              true: palette[scheme].highlight.light,
              false: palette[scheme].neutral.light.medium,
            }}
            thumbColor={palette[scheme].highlight.medium}
          />
        </View>

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

        {isAuthenticated ? (
          <View style={{ marginTop: 24 }}>
            <Pressable onPress={handleLogout} hitSlop={HIT_SLOP}>
              <Text
                style={{
                  color: palette[scheme].highlight.medium,
                  fontWeight: "700",
                }}
              >
                Log out
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}
