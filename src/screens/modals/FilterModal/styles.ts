import { StyleSheet } from "react-native";
import { spacing, typography } from "@/shared/lib/tokens";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerAction: {
    ...typography.action.m,
  },
  headerTitle: {
    ...typography.heading.h3,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  footer: {
    marginTop: "auto",
  },
});
