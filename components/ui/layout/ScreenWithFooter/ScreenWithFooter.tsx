import React, { Fragment } from "react";
import { View, ScrollView, ViewStyle } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { palette } from "@/constants/palette";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { makeStyles } from "./styles";
import { BTN_H, FOOTER_H, FOOTER_PADDING_V } from "./constants";
import type { ScreenWithFooterProps } from "./types";

export default function ScreenWithFooter({
  scroll = true,
  contentPadding = 16,
  footer,
  style,
  contentStyle,
  footerStyle,
  children,
  testID,
}: ScreenWithFooterProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);
  const insets = useSafeAreaInsets();

  const ContentWrapper: any = scroll ? ScrollView : View;
  const btnH = BTN_H[footer.size ?? "md"] ?? BTN_H.md;

  const sharedPadding: ViewStyle = {
    padding: contentPadding,
    paddingBottom: Math.max(FOOTER_H, btnH) + insets.bottom + FOOTER_PADDING_V,
  };

  return (
    <SafeAreaView style={[s.root, style]} testID={testID}>
      <View style={s.container}>
        <ContentWrapper
          {...(scroll
            ? { contentContainerStyle: [sharedPadding, contentStyle] }
            : { style: [{ flex: 1 }, sharedPadding, contentStyle] })}
        >
          <Fragment>{children}</Fragment>
        </ContentWrapper>

        <View
          style={[
            s.footer,
            {
              paddingTop: FOOTER_PADDING_V,
              paddingHorizontal: 16,
            },
            footerStyle as ViewStyle,
          ]}
        >
          <PrimaryButton
            title={footer.label}
            onPress={footer.onPress}
            disabled={footer.disabled}
            loading={footer.loading}
            leftIcon={footer.leftIcon}
            variant={footer.variant ?? "solid"}
            size={footer.size ?? "md"}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
