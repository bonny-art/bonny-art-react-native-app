import { useState } from "react";
import { Alert, Pressable, Switch, View } from "react-native";
import { Text } from "@shared/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { spacing } from "@/shared/lib/tokens";
import { IconSymbol } from "@shared/ui/IconSymbol";
import { UserAvatar } from "@shared/ui/UserAvatar";
import { PrimaryButton } from "@shared/ui/PrimaryButton";
import { makeStyles } from "./styles";
import {
  ICON_SIZE,
  HIT_SLOP,
  LOGOUT_ERROR_MESSAGE,
  LOGOUT_ERROR_TITLE,
  LOGOUT_MODAL_CANCEL_LABEL,
  LOGOUT_MODAL_CONFIRM_LABEL,
  LOGOUT_MODAL_DISMISS_LABEL,
  LOGOUT_MODAL_MESSAGE,
  LOGOUT_MODAL_TITLE,
  LOGOUT_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS_TITLE,
} from "./constants";
import type { ProfileDrawerContentProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { logout } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { router } from "expo-router";
import { PATHS } from "@/navigation/routes";
import { ActionModal } from "@/shared/ui/ActionModal";
import {
  AUTH_PROMPT_CANCEL_LABEL,
  AUTH_PROMPT_CONFIRM_LABEL,
  AUTH_PROMPT_DISMISS_LABEL,
  AUTH_PROMPT_MESSAGE,
  AUTH_PROMPT_TITLE,
} from "@/shared/constants/auth";

export function ProfileDrawerContent({
  navigation,
}: ProfileDrawerContentProps) {
  const { currentTheme, toggleTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const s = makeStyles(scheme);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);

  const handleFavorites = () => {
    if (!isAuthenticated) {
      setAuthModalVisible(true);
      return;
    }
    router.navigate(PATHS.TABS_FAVORITES);
    navigation.closeDrawer();
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.warn("Logout failed:", error);
      Alert.alert(LOGOUT_ERROR_TITLE, LOGOUT_ERROR_MESSAGE);
      return;
    }
    navigation.closeDrawer();
    Alert.alert(LOGOUT_SUCCESS_TITLE, LOGOUT_SUCCESS_MESSAGE);
    router.navigate(PATHS.TABS);
  };

  const handleLogin = () => {
    setAuthModalVisible(false);
    router.navigate(PATHS.AUTH_LOGIN);
    navigation.closeDrawer();
  };

  const handleSignUp = () => {
    router.navigate(PATHS.AUTH_SIGN_UP);
    navigation.closeDrawer();
  };

  const handleCloseAuthModal = () => {
    setAuthModalVisible(false);
  };

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.content}>
        <Text style={s.headerText}>Profile</Text>

        <View style={s.headerBlock}>
          <UserAvatar
            size="lg"
            showEditBadge
            source={user?.avatar ? { uri: user.avatar } : undefined}
          />
          <Text style={s.userName} numberOfLines={1}>
            {user?.name ?? "Guest"}
          </Text>
        </View>

        <Pressable
          hitSlop={HIT_SLOP}
          onPress={handleFavorites}
          style={s.itemRow}
          accessibilityRole="button"
          accessibilityLabel="Go to favorites"
        >
          <IconSymbol
            name="heart"
            color={palette[scheme].highlight.medium}
            size={ICON_SIZE}
          />
          <Text style={s.itemText}>Favorites</Text>
        </Pressable>

        <View style={s.divider} />

        <View style={s.switchRow}>
          <Text style={s.itemText}>Dark theme</Text>
          <Switch
            value={scheme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{
              true: palette[scheme].highlight.light,
              false: palette[scheme].neutral.light.medium,
            }}
            thumbColor={palette[scheme].highlight.medium}
          />
        </View>

        {isAuthenticated ? (
          <View style={{ marginTop: spacing.xl }}>
            <Pressable onPress={handleLogout} hitSlop={HIT_SLOP}>
              <Text
                style={{
                  color: palette[scheme].highlight.medium,
                  fontWeight: "700",
                }}
              >
                Log out
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={s.authActions}>
            <PrimaryButton
              title="Log in"
              variant="outline"
              fullWidth
              onPress={handleLogin}
            />
            <PrimaryButton title="Sign up" fullWidth onPress={handleSignUp} />
          </View>
        )}
      </View>
      <ActionModal
        visible={isLogoutModalVisible}
        title={LOGOUT_MODAL_TITLE}
        message={LOGOUT_MODAL_MESSAGE}
        onRequestClose={handleCancelLogout}
        dismissAccessibilityLabel={LOGOUT_MODAL_DISMISS_LABEL}
        cancelAction={{
          label: LOGOUT_MODAL_CANCEL_LABEL,
          onPress: handleCancelLogout,
          variant: "outline",
        }}
        confirmAction={{
          label: LOGOUT_MODAL_CONFIRM_LABEL,
          onPress: handleConfirmLogout,
        }}
      />
      <ActionModal
        visible={isAuthModalVisible}
        title={AUTH_PROMPT_TITLE}
        message={AUTH_PROMPT_MESSAGE}
        onRequestClose={handleCloseAuthModal}
        dismissAccessibilityLabel={AUTH_PROMPT_DISMISS_LABEL}
        cancelAction={{
          label: AUTH_PROMPT_CANCEL_LABEL,
          onPress: handleCloseAuthModal,
          variant: "outline",
        }}
        confirmAction={{
          label: AUTH_PROMPT_CONFIRM_LABEL,
          onPress: handleLogin,
        }}
      />
    </View>
  );
}
