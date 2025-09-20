import { StyleSheet } from "react-native";
import { radius, sizes, spacing, typography } from "@/shared/lib/tokens";

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.heading.h3,
  },
  badge: {
    width: sizes.badge.filter,
    height: sizes.badge.filter,
    borderRadius: radius.badge,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    ...typography.body.s,
    fontWeight: "600",
  },
  content: {
    paddingBottom: spacing.md,
  },
});
