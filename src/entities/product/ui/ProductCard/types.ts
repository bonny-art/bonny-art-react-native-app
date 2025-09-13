export type ProductCardVariant = "tile" | "favorite";

export type ProductCardProps = {
  title: string;
  price: number | string;
  imageUrl?: string | null;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;

  width?: number;

  // Для Favorites
  onAddToCart?: () => void;
  inCart?: boolean;

  // "tile" для Explore/Home, "favorite" для Favorites
  variant?: ProductCardVariant;

  // accessibility / testing
  testID?: string;
  allowFontScaling?: boolean;
};
