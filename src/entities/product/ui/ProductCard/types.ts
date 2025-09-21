export type ProductCardVariant = "tile" | "favorite";

export type ProductCardProps = {
  title: string;
  price: number | string;
  imageUrl?: string | null;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;

  width?: number;

  onAddToCart?: () => void;
  inCart?: boolean;

  variant?: ProductCardVariant;

  testID?: string;
  allowFontScaling?: boolean;
};
