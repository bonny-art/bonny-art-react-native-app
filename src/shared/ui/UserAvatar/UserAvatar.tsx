import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { Image, TouchableOpacity, View } from "react-native";
import { BADGE, svgSizeFor } from "./constants";
import { makeAvatarStyles } from "./styles";
import type { UserAvatarProps } from "./types";

import UserSvg from "@shared/assets/svgs/user/user.svg";
import { IconSymbol } from "@/shared/ui/IconSymbol";

type Scheme = keyof typeof palette;

export function getAvatarColors(scheme: Scheme) {
  const p = palette[scheme];
  return scheme === "dark"
    ? { fg: p.highlight.darkest, bg: p.highlight.lightest }
    : { fg: p.highlight.lightest, bg: p.highlight.darkest };
}

export function UserAvatar({
  source,
  size = "md",
  showEditBadge = false,
  onPress,
  onEditPress,
  style,
  testID,
}: UserAvatarProps) {
  console.log("🚀 ~ source:", source);
  const { currentTheme: scheme } = useTheme();
  const s = makeAvatarStyles(scheme, size);
  const p = palette[scheme];

  const Content = (
    <View style={s.frame}>
      {source ? (
        <Image source={source} style={s.image} resizeMode="cover" />
      ) : (
        <View style={[s.placeholderBase, s.placeholderPad]}>
          {(() => {
            const { w, h } = svgSizeFor(size);
            return <UserSvg width={w} height={h} color={p.highlight.darkest} />;
          })()}
        </View>
      )}
    </View>
  );

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={[s.container, style]} testID={testID}>
      <Wrapper {...(onPress ? { onPress, activeOpacity: 0.8 } : null)}>
        {Content}
      </Wrapper>

      {showEditBadge &&
        (onEditPress ? (
          <TouchableOpacity
            onPress={onEditPress}
            activeOpacity={0.8}
            style={s.badge}
            accessibilityLabel="Edit avatar"
          >
            <IconSymbol
              name="pencil"
              size={Math.max(12, Math.round(BADGE.size * 0.55))}
              color={p.neutral.dark.darkest}
            />
          </TouchableOpacity>
        ) : (
          <View style={s.badge}>
            <IconSymbol
              name="pencil"
              size={Math.max(12, Math.round(BADGE.size * 0.55))}
              color={p.neutral.dark.darkest}
            />
          </View>
        ))}
    </View>
  );
}
