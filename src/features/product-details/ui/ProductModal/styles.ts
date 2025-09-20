import { StyleSheet } from "react-native";
import { sizes, spacing, typography } from "@/shared/lib/tokens";
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
      marginTop: -sizes.productModal.panelOverlap,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
    },

    title: {
      color: p.neutral.light.lightest,
      ...typography.heading.h2,
    },

    price: {
      color: p.neutral.light.medium,
      ...typography.body.m,
      marginBottom: spacing.lg,
    },

    metricsTitle: {
      color: p.neutral.light.light,
      ...typography.body.s,
      marginBottom: spacing.xs,
    },

    metric: {
      color: p.neutral.light.medium,
      ...typography.body.s,
    },

    placeholder: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
