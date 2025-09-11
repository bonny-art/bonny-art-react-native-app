import { Dimensions } from "react-native";

export const GALLERY_HEIGHT = Math.round(
  Dimensions.get("window").height * 0.48
);

export const DOT = { size: 6, gap: 6 } as const;
