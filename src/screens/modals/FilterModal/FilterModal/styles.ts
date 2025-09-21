import { StyleSheet } from "react-native";

import { radius, sizes, spacing, typography } from "@/shared/lib/tokens";

/**
 * Shapes the Filter modal sheet container and typography styles.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: sizes.modal.maxWidth,
    alignSelf: "center",
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAction: {
    ...typography.body.m,
    fontWeight: "600",
  },
  headerTitle: {
    ...typography.heading.h2,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    rowGap: spacing.sm,
  },
  footer: {
    marginTop: "auto",
  },
});
