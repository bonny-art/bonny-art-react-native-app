import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { useTheme } from "@/providers/theme/ThemeContext";
import { Fragment } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BTN_H, FOOTER_H, FOOTER_PADDING_V } from "./constants";
import { spacing } from "@/shared/lib/tokens";
import { makeStyles } from "./styles";
import type { ScreenWithFooterProps } from "./types";

/**
 * Provides a screen layout with optional scrollable content and a fixed footer action.
 */
export function ScreenWithFooter({
  scroll = true,
  contentPadding = spacing.lg,
  footer,
  style,
  contentStyle,
  footerStyle,
  children,
  testID,
}: ScreenWithFooterProps) {
  const { currentTheme: scheme } = useTheme();
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
              paddingHorizontal: spacing.lg,
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
