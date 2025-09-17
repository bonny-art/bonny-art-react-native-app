import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

export type IconName =
  | "heart"
  | "heart-outline"
  | "bell"
  | "bell-outline"
  | "filter"
  | "sort"
  | "cart"
  | "search"
  | "user"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "close"
  | "plus"
  | "minus"
  | "star"
  | "star-outline"
  | "lock"
  | "settings"
  | "pencil"
  | "image"
  | "eye"
  | "eye-off"
  | "check";

const nameMap: Record<
  IconName,
  React.ComponentProps<typeof MaterialCommunityIcons>["name"]
> = {
  heart: "heart",
  "heart-outline": "heart-outline",
  bell: "bell",
  "bell-outline": "bell-outline",
  filter: "filter-variant",
  sort: "sort-variant",
  cart: "cart",
  search: "magnify",
  user: "account",
  "chevron-left": "chevron-left",
  "chevron-right": "chevron-right",
  "chevron-up": "chevron-up",
  "chevron-down": "chevron-down",
  close: "close",
  plus: "plus",
  minus: "minus",
  star: "star",
  "star-outline": "star-outline",
  lock: "lock",
  settings: "cog",
  pencil: "pencil",
  image: "image",
  eye: "eye",
  "eye-off": "eye-off",
  check: "check",
};

export type IconSymbolProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
  accessibilityLabel?: string;
};

export const IconSymbol: React.FC<IconSymbolProps> = ({
  name,
  size = 24,
  color,
  style,
  accessibilityLabel,
}) => {
  const mapped = nameMap[name];
  return (
    <MaterialCommunityIcons
      name={mapped}
      size={size}
      color={color}
      style={style}
      accessibilityLabel={accessibilityLabel ?? name}
      accessibilityRole="image"
    />
  );
};
