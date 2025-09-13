import React, { useState, type ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Text } from "@shared/ui/Text";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { sectionStyles as S } from "./Section.styles";

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
    <View style={[S.container, { borderColor: colors.neutral.dark.light }]}>
      <TouchableOpacity
        onPress={() => setOpen((o) => !o)}
        style={S.header}
        activeOpacity={0.8}
      >
        <Text style={[S.title, { color: colors.neutral.light.light }]}>
          {title}
        </Text>
        {selectedCount > 0 ? (
          <View style={[S.badge, { backgroundColor: colors.highlight.medium }]}>
            <Text style={[S.badgeText, { color: colors.neutral.dark.dark }]}>
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
      {open && <View style={S.content}>{children}</View>}
    </View>
  );
}
