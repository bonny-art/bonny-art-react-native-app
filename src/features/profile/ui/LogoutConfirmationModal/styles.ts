import { StyleSheet } from "react-native";

import { palette } from "@shared/lib/palette";
import { radius, spacing, typography } from "@/shared/lib/tokens";

import { MODAL_MAX_WIDTH, MODAL_WIDTH_PERCENTAGE } from "./constants";

export const makeStyles = (scheme: keyof typeof palette) => {
  const colors = palette[scheme];

  return StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.xl,
    },
    backdropPressable: {
      ...StyleSheet.absoluteFillObject,
    },
    overlay: {
      flex: 1,
      backgroundColor: colors.neutral.dark.darkest,
      opacity: 0.55,
    },
    modalCard: {
      width: MODAL_WIDTH_PERCENTAGE,
      maxWidth: MODAL_MAX_WIDTH,
      borderRadius: radius.lg,
      backgroundColor: colors.neutral.dark.dark,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xl,
      alignItems: "stretch",
      gap: spacing.md,
    },
    title: {
      ...typography.heading.h3,
      color: colors.neutral.light.lightest,
      textAlign: "center",
    },
    message: {
      ...typography.body.m,
      color: colors.neutral.light.lightest,
      textAlign: "center",
    },
    actions: {
      flexDirection: "row",
      gap: spacing.sm,
      marginTop: spacing.lg,
    },
    actionButton: {
      flex: 1,
    },
  });
};
