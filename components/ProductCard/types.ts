export type ProductCardVariant = "tile" | "favorite";

export type ProductCardProps = {
  title: string;
  price: number | string;
  imageUrl?: string | null;
  favorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;

  /** Для грід-розкладок можна задати ширину плитки (без паддінгів контейнера) */
  width?: number;

  /** Для Favorites */
  onAddToCart?: () => void;

  /** "tile" для Explore/Home, "favorite" для Favorites */
  variant?: ProductCardVariant;

  /** accessibility / testing */
  testID?: string;
  allowFontScaling?: boolean;
};
