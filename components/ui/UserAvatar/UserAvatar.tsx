import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import { makeAvatarStyles } from "./styles";
import { BADGE, svgSizeFor } from "./constants";
import type { UserAvatarProps } from "./types";

import UserSvg from "@/assets/svgs/user/user.svg";
import { IconSymbol } from "../IconSymbol";

type Scheme = keyof typeof palette;

export function getAvatarColors(scheme: Scheme) {
  const p = palette[scheme];
  return scheme === "dark"
    ? { fg: p.highlight.darkest, bg: p.highlight.lightest }
    : { fg: p.highlight.lightest, bg: p.highlight.darkest };
}

export default function UserAvatar({
  source,
  size = "md",
  showEditBadge = false,
  onPress,
  onEditPress,
  style,
  testID,
}: UserAvatarProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const { fg, bg } = getAvatarColors(scheme);
  const s = makeAvatarStyles(scheme, size);

  const p = palette[scheme];

  const Content = (
    <View style={[s.frame, { backgroundColor: bg }]}>
      {source ? (
        <Image source={source} style={s.image} resizeMode="cover" />
      ) : (
        <View style={[s.placeholderBase, s.placeholderPad]}>
          {(() => {
            const { w, h } = svgSizeFor(size);
            return <UserSvg width={w} height={h} color={fg} fill={fg} />;
          })()}
        </View>
      )}
    </View>
  );

  const Wrapper: any = onPress ? TouchableOpacity : View;

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
