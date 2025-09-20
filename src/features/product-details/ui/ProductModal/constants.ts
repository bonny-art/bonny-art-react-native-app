import { Dimensions } from "react-native";
import { sizes } from "@/shared/lib/tokens";

export const GALLERY_HEIGHT = Math.round(
  Dimensions.get("window").height * 0.48
);

export const DOT = {
  size: sizes.heroCarousel.dotSize,
  gap: sizes.heroCarousel.dotSpacing,
} as const;
