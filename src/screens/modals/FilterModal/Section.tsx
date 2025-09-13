import React, { useState, type ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";
import { Text } from "@shared/ui/Text";
import { IconSymbol } from "@/shared/ui/IconSymbol";

interface SectionProps {
  title: string;
  selectedCount: number;
  children: ReactNode;
}

export function Section({ title, selectedCount, children }: SectionProps) {
  const { currentTheme: scheme } = useTheme();
  const colors = palette[scheme];
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{ borderBottomWidth: 1, borderColor: colors.neutral.dark.light }}
    >
      <TouchableOpacity
        onPress={() => setOpen((o) => !o)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: spacing.md,
        }}
        activeOpacity={0.8}
      >
        <Text
          style={{
            ...typography.heading.h3,
            color: colors.neutral.light.light,
          }}
        >
          {title}
        </Text>
        {selectedCount > 0 ? (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: colors.highlight.medium,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...typography.body.s,
                color: colors.neutral.dark.dark,
                fontWeight: "600",
              }}
            >
              {selectedCount}
            </Text>
          </View>
        ) : (
          <IconSymbol
            name={open ? "chevron-up" : "chevron-down"}
            size={24}
            color={colors.neutral.light.light}
          />
        )}
      </TouchableOpacity>
      {open && <View style={{ paddingBottom: spacing.md }}>{children}</View>}
    </View>
  );
}
