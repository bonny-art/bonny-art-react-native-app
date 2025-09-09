import { IconButton } from "@/shared/ui/IconButton";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { View } from "react-native";
import { makeStyles } from "./styles";
import type { InfoBarProps } from "./types";

export function InfoBar({
  onSearch,
  onFavorites,
  onCart,
  cartCount,
  favoritesSelected,
  style,
  testID,
}: InfoBarProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
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
