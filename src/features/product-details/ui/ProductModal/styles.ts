import { StyleSheet } from "react-native";
import { spacing } from "@/shared/lib/tokens";
import { font } from "@shared/lib/responsive";
import { palette } from "@shared/lib/palette";
import { DOT, GALLERY_HEIGHT } from "./constants";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },

    hero: {
      height: GALLERY_HEIGHT,
      backgroundColor: p.neutral.dark.medium,
    },

    // close button over image, top-right (inside safe area thanks to SafeAreaView)
    closeWrap: {
      position: "absolute",
      top: spacing.md,
      right: spacing.xl,
      zIndex: 3,
    },

    dots: {
      position: "absolute",
      bottom: spacing.md,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "center",
      gap: DOT.gap,
    },

    dot: {
      width: DOT.size,
      height: DOT.size,
      borderRadius: DOT.size / 2,
    },

    panel: {
      flex: 1,
      backgroundColor: p.neutral.dark.dark,
      marginTop: -16,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
      // paddingBottom додаємо у компоненті, враховуючи insets.bottom
    },

    title: {
      color: p.neutral.light.lightest,
      fontSize: font(18),
      fontWeight: "700",
    },

    price: {
      color: p.neutral.light.medium,
      fontSize: font(14),
      marginBottom: spacing.lg,
    },

    metricsTitle: {
      color: p.neutral.light.light,
      fontSize: font(12),
      marginBottom: spacing.xs,
    },

    metric: {
      color: p.neutral.light.medium,
      fontSize: font(12),
    },

    placeholder: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
