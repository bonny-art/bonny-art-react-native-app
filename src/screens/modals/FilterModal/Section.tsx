import React, { useState, type ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Text } from "@shared/ui/Text";
import { IconButton } from "@/shared/ui/IconButton";
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
  const toggleOpen = () => setOpen((o) => !o);

  return (
    <View style={[S.container, { borderColor: colors.neutral.dark.light }]}>
      <TouchableOpacity
        onPress={toggleOpen}
        style={S.header}
        activeOpacity={0.8}
      >
        <Text style={[S.title, { color: colors.neutral.light.light }]}>
          {title}
        </Text>
        {selectedCount > 0 ? (
          //   <View style={[S.badge, { backgroundColor: colors.highlight.medium }]}>
          //     <Text style={[S.badgeText, { color: colors.neutral.dark.dark }]}>
          //       {selectedCount}
          //     </Text>
          //   </View>
          <IconButton label={selectedCount} size="sm" onPress={toggleOpen} />
        ) : (
          <IconButton
            icon={open ? "chevron-up" : "chevron-down"}
            size="sm"
            variant="ghost"
            onPress={toggleOpen}
          />
        )}
      </TouchableOpacity>
      {open && <View style={S.content}>{children}</View>}
    </View>
  );
}
