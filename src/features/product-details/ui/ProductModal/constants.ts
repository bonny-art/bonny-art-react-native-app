import { Dimensions } from "react-native";

/** Висота hero-галереї (як у макеті ~48% екрана) */
export const GALLERY_HEIGHT = Math.round(
  Dimensions.get("window").height * 0.48
);

/** Розміри дотсів під слайдером */
export const DOT = { size: 6, gap: 6 } as const;
