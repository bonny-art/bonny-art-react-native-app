import { IconSymbol } from "@/shared/ui/IconSymbol";
import { PrimaryButton } from "@/shared/ui/PrimaryButton/PrimaryButton";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { mscale, scale, vscale } from "@shared/lib/responsive";
import React, { memo } from "react";
import { GestureResponderEvent, Image, Pressable, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { styles as S } from "./styles";
import type { ProductCardProps } from "./types";
import { typography } from "@/shared/config";

/**
 * ProductCard
 * - variant="tile"     -> для Home/Explore гріду (heart на фото)
 * - variant="favorite" -> для Favorites списку (як на макеті)
 */
export const ProductCardView: React.FC<ProductCardProps> = ({
  title,
  price,
  imageUrl,
  favorite = false,
  onToggleFavorite,
  onPress,
  width,
  variant = "tile",
  onAddToCart,
  testID,
  allowFontScaling = true,
}) => {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];

  const c = {
    surface: {
      raised: p.neutral.dark.medium,
      sunken: p.neutral.dark.light,
    },
    text: {
      primary:
        scheme === "light" ? p.neutral.light.lightest : p.neutral.light.darkest,
      secondary:
        scheme === "light" ? p.neutral.light.medium : p.neutral.light.light,
      onAccent: p.neutral.dark.darkest,
    },
    highlight: p.highlight,
    neutral: p.neutral,
  };

  const cardWidth =
    variant === "tile" ? width ?? scale(156) : width ?? undefined;
  const imageHeight = variant === "tile" ? vscale(112) : vscale(200);

  const containerStyle = [
    S.card,
    {
      backgroundColor: c.surface[variant === "tile" ? "raised" : "sunken"],
      width: cardWidth,
    },
    variant === "favorite" && S.cardFavorite,
  ];

  const Title = (
    <Text
      allowFontScaling={allowFontScaling}
      numberOfLines={2}
      style={[S.title, { color: c.text.primary, ...typography.body.s }]}
    >
      {title}
    </Text>
  );

  const Price = (
    <Text
      allowFontScaling={allowFontScaling}
      style={[S.price, { color: c.text.secondary, ...typography.body.m }]}
    >
      ${typeof price === "number" ? price.toFixed(2) : price}
    </Text>
  );

  // Heart на фото (кругла кнопка) — тільки для tile
  const FavButtonTile = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        favorite ? "Remove from favorites" : "Add to favorites"
      }
      hitSlop={8}
      onPress={(e: GestureResponderEvent) => {
        e.stopPropagation?.();
        onToggleFavorite?.();
      }}
      style={({ pressed }) => [
        S.favBtn,
        { backgroundColor: c.highlight.darkest, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <IconSymbol
        name={favorite ? "heart" : "heart-outline"}
        size={mscale(16)}
        color={c.highlight.lightest}
      />
    </Pressable>
  );

  // Heart у футері (без фону) — для favorite
  const FavButtonInline = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        favorite ? "Remove from favorites" : "Add to favorites"
      }
      hitSlop={8}
      onPress={(e: GestureResponderEvent) => {
        e.stopPropagation?.();
        onToggleFavorite?.();
      }}
      style={({ pressed }) => [S.favBtnInline, { opacity: pressed ? 0.8 : 1 }]}
    >
      <IconSymbol
        name={favorite ? "heart" : "heart-outline"}
        size={mscale(18)}
        color={c.highlight.medium}
      />
    </Pressable>
  );

  const ImageBox = (
    <View
      style={[
        S.imageWrap,
        { height: imageHeight, backgroundColor: c.surface.sunken },
      ]}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} resizeMode="cover" style={S.image} />
      ) : (
        <View style={S.placeholder}>
          <IconSymbol name="image" size={mscale(20)} color={c.highlight.dark} />
        </View>
      )}
      {variant === "tile" && onToggleFavorite ? FavButtonTile : null}
    </View>
  );

  // Футер для tile
  const FooterTile = (
    <View style={S.meta}>
      {Title}
      {Price}
    </View>
  );

  // Футер для favorite
  const FooterFavorite = (
    <View style={S.metaFav}>
      <View style={S.row}>
        <View style={{ flex: 1 }}>
          {Title}
          {Price}
        </View>
        {onToggleFavorite ? FavButtonInline : null}
      </View>

      <PrimaryButton
        title="Add to cart"
        onPress={onAddToCart}
        fullWidth
        size="md"
        variant="outline"
        style={S.cartBtn}
        textStyle={S.cartText}
      />
    </View>
  );

  const content = (
    <>
      {ImageBox}
      {variant === "tile" ? FooterTile : FooterFavorite}
    </>
  );

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      {content}
    </Pressable>
  );
};

export const ProductCard = memo(ProductCardView);
ProductCard.displayName = "ProductCard";
