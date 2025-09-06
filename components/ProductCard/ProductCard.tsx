import React, { memo } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { scale, vscale, mscale, font } from "@/constants/responsive";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { styles as S } from "./styles";
import type { ProductCardProps } from "./types";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";

/**
 * ProductCard
 * - variant="tile"     -> для Home/Explore гріду
 * - variant="favorite" -> для Favorites списку
 */
const ProductCard: React.FC<ProductCardProps> = ({
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
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const p = palette[scheme];

  const c = {
    // Фони карток/плашок
    surface: {
      // трохи світліший фон «припіднятої» плитки
      raised: p.neutral.dark.medium,
      // темніший/глибший фон під зображення або плейсхолдер
      sunken: p.neutral.dark.light,
    },

    // Текст
    text: {
      // основний текст (у світлій темі — темний; у темній — світлий)
      primary:
        scheme === "light" ? p.neutral.light.lightest : p.neutral.light.darkest,
      // другорядний
      secondary:
        scheme === "light" ? p.neutral.light.medium : p.neutral.light.light,
      // текст поверх акцентної кнопки (жовтої)
      onAccent: p.neutral.dark.darkest,
    },

    // Акцент/бренд
    accent: {
      brand: p.highlight.medium,
    },

    // Щоб не ламати решту коду, прокинемо сирі групи теж
    highlight: p.highlight,
    neutral: p.neutral,
  };

  // динамічні розміри плитки
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
      style={[S.title, { color: c.text.primary, fontSize: font(13) }]}
    >
      {title}
    </Text>
  );

  const Price = (
    <Text
      allowFontScaling={allowFontScaling}
      style={[S.price, { color: c.text.secondary, fontSize: font(12) }]}
    >
      ${typeof price === "number" ? price.toFixed(2) : price}
    </Text>
  );

  const FavButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        favorite ? "Remove from favorites" : "Add to favorites"
      }
      hitSlop={8}
      onPress={onToggleFavorite}
      style={({ pressed }) => [
        S.favBtn,
        { backgroundColor: c.highlight.darkest, opacity: pressed ? 0.85 : 1 },
        variant === "favorite" && S.favBtnOutside,
      ]}
    >
      <IconSymbol
        name={favorite ? "heart" : "heart-outline"}
        size={mscale(16)}
        color={c.highlight.lightest}
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
      {/* Серце поверх зображення тільки для плитки */}
      {variant === "tile" && onToggleFavorite ? FavButton : null}
    </View>
  );

  const FooterTile = (
    <View style={S.meta}>
      {Title}
      {Price}
    </View>
  );

  const FooterFavorite = (
    <View style={S.metaFav}>
      <View style={{ flex: 1 }}>
        {Title}
        {Price}
      </View>

      {/* Серце праворуч від назви у Favorites */}
      {onToggleFavorite ? FavButton : null}

      <PrimaryButton
        title="+ Add to cart"
        onPress={onAddToCart}
        fullWidth
        size="md"
        variant="solid"
        leftIcon={
          <IconSymbol
            name="cart"
            size={mscale(18)}
            color={c.neutral.dark.darkest}
          />
        }
        // опційно: disabled / loading тут же з пропсів, якщо додаси
        style={{ marginTop: mscale(10) }}
      />
    </View>
  );

  // Контент картки
  const content = (
    <>
      {ImageBox}
      {variant === "tile" ? FooterTile : FooterFavorite}
    </>
  );

  // Для плитки — вся картка клікабельна
  return variant === "tile" ? (
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
  ) : (
    <View testID={testID} style={containerStyle}>
      {/* у Favorites детально натискаються окремі елементи */}
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        {ImageBox}
      </Pressable>
      {variant === "favorite" ? FooterFavorite : FooterTile}
    </View>
  );
};

export default memo(ProductCard);
