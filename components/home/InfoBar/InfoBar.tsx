import React from "react";
import { View } from "react-native";
import IconButton from "@/components/ui/IconButton";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { makeStyles } from "./styles";
import type { InfoBarProps } from "./types";

export default function InfoBar({
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
