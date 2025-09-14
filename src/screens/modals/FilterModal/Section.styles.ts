import { StyleSheet } from "react-native";
import { spacing, typography } from "@/shared/lib/tokens";

export const sectionStyles = StyleSheet.create({
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
    width: 33,
    height: 33,
    borderRadius: 17,
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
