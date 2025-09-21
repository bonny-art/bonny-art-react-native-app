import { StyleProp, ViewStyle } from "react-native";

export type InfoBarProps = {
  onSearch?: () => void;
  onFavorites?: () => void;
  onCart?: () => void;
  cartCount?: number;
  favoritesSelected?: boolean;
  showSearchButton?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
