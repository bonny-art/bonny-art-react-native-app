import { StyleSheet, type ViewStyle } from "react-native";

import { palette } from "@/shared/lib/palette";

export type ExploreScreenStyles = {
  safeArea: ViewStyle;
  loaderSafeArea: ViewStyle;
  loaderContainer: ViewStyle;
};

type ThemeName = keyof typeof palette;

export const makeStyles = (theme: ThemeName): ExploreScreenStyles => {
  const colors = palette[theme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.neutral.dark.darkest,
    },
    loaderSafeArea: {
      flex: 1,
      backgroundColor: colors.neutral.dark.darkest,
    },
    loaderContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
