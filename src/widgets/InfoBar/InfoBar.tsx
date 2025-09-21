import { IconButton } from "@/shared/ui/IconButton";
import { useTheme } from "@/providers/theme/ThemeContext";
import { View } from "react-native";
import { makeStyles } from "./styles";
import type { InfoBarProps } from "./types";

/**
 * Renders the quick-access bar with search, favorites, and cart shortcuts.
 */
export function InfoBar({
  onSearch,
  onFavorites,
  onCart,
  cartCount,
  favoritesSelected,
  style,
  testID,
}: InfoBarProps) {
  const { currentTheme: scheme } = useTheme();
  const s = makeStyles(scheme);

  return (
    <View style={[s.root, style]} testID={testID}>
      <IconButton
        icon="search"
        variant="ghost"
        size="md"
        onPress={onSearch}
        accessibilityLabel="Search"
      />

      <View style={s.right}>
        <IconButton
          icon="heart"
          variant="ghost"
          size="md"
          selected={!!favoritesSelected}
          onPress={onFavorites}
          accessibilityLabel="Favorites"
        />
        <IconButton
          icon="cart"
          variant="ghost"
          size="md"
          badgeCount={cartCount}
          onPress={onCart}
          accessibilityLabel="Cart"
        />
      </View>
    </View>
  );
}
