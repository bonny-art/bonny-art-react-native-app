import { IconSymbol } from "@/shared/ui/IconSymbol";
import { PrimaryButton } from "@/shared/ui/PrimaryButton/PrimaryButton";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { mscale, scale, vscale } from "@shared/lib/responsive";
import React, { memo, useMemo } from "react";
import { Image, Pressable, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { IconButton } from "@/shared/ui/IconButton";
import { makeStyles } from "./styles";
import type { ProductCardProps } from "./types";

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
  inCart,
  testID,
  allowFontScaling = true,
}) => {
  const { currentTheme: scheme } = useTheme();
  const p = palette[scheme];
  const styles = useMemo(() => makeStyles(scheme), [scheme]);

  const cardWidth =
    variant === "tile" ? width ?? scale(156) : width ?? undefined;
  const imageHeight = variant === "tile" ? vscale(112) : vscale(200);

  const containerStyle = [
    styles.card,
    { width: cardWidth },
    variant === "favorite" && styles.cardFavorite,
  ];

  const Title = (
    <Text
      allowFontScaling={allowFontScaling}
      numberOfLines={2}
      style={styles.title}
    >
      {title}
    </Text>
  );

  const Price = (
    <Text allowFontScaling={allowFontScaling} style={styles.price}>
      ${typeof price === "number" ? price.toFixed(2) : price}
    </Text>
  );

  // Heart на фото (кругла кнопка) — тільки для tile
  const FavButtonTile = (
    <IconButton
      accessibilityLabel={
        favorite ? "Remove from favorites" : "Add to favorites"
      }
      icon={favorite ? "heart" : "heart-outline"}
      selected
      size="sm"
      onPress={onToggleFavorite}
      style={styles.favBtnTile}
      toneIcon="highlight"
      toneBg="background"
      toneBorder="background"
    />
  );

  // Heart у футері (без фону) — для favorite
  const FavButtonInline = (
    <IconButton
      accessibilityLabel={
        favorite ? "Remove from favorites" : "Add to favorites"
      }
      icon={favorite ? "heart" : "heart-outline"}
      variant="ghost"
      size="md"
      padded={false}
      onPress={onToggleFavorite}
      style={styles.favBtnInline}
      toneIcon="highlight"
    />
  );

  const ImageBox = (
    <View style={[styles.imageWrap, { height: imageHeight }]}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <IconSymbol name="image" size={mscale(20)} color={p.highlight.dark} />
        </View>
      )}
      {variant === "tile" && onToggleFavorite ? FavButtonTile : null}
    </View>
  );

  // Футер для tile
  const FooterTile = (
    <View style={styles.meta}>
      {Title}
      {Price}
    </View>
  );

  // Футер для favorite
  const FooterFavorite = (
    <View style={styles.metaFav}>
      <View style={styles.row}>
        <View style={styles.details}>
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
        style={styles.cartBtn}
        textStyle={styles.cartText}
        leftIcon={
          inCart ? (
            <IconSymbol
              name="cart"
              size={mscale(16)}
              color={p.highlight.medium}
            />
          ) : undefined
        }
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

const areProductCardPropsEqual = (
  prev: Readonly<ProductCardProps>,
  next: Readonly<ProductCardProps>
) => {
  if (prev.title !== next.title) return false;
  if (prev.price !== next.price) return false;
  if (prev.imageUrl !== next.imageUrl) return false;
  if ((prev.favorite ?? false) !== (next.favorite ?? false)) return false;
  if (prev.width !== next.width) return false;
  if (prev.variant !== next.variant) return false;
  if ((prev.inCart ?? false) !== (next.inCart ?? false)) return false;
  if (prev.testID !== next.testID) return false;
  if ((prev.allowFontScaling ?? true) !== (next.allowFontScaling ?? true))
    return false;
  if (!!prev.onPress !== !!next.onPress) return false;
  if (!!prev.onToggleFavorite !== !!next.onToggleFavorite) return false;
  if (!!prev.onAddToCart !== !!next.onAddToCart) return false;
  return true;
};

export const ProductCard = memo(ProductCardView, areProductCardPropsEqual);
ProductCard.displayName = "ProductCard";
