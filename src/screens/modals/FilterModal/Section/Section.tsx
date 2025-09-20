import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Text } from "@shared/ui/Text";
import { IconButton } from "@/shared/ui/IconButton";

import { styles as S } from "./styles";
import { INITIAL_OPEN_STATE, SECTION_ACTIVE_OPACITY } from "./constants";
import type { SectionProps } from "./types";

export function Section({ title, selectedCount, children }: SectionProps) {
  const { currentTheme: scheme } = useTheme();
  const colors = palette[scheme];
  const [open, setOpen] = useState(INITIAL_OPEN_STATE);
  const toggleOpen = () => setOpen((o) => !o);

  return (
    <View style={[S.container, { borderColor: colors.neutral.dark.light }]}>
      <TouchableOpacity
        onPress={toggleOpen}
        style={S.header}
        activeOpacity={SECTION_ACTIVE_OPACITY}
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
