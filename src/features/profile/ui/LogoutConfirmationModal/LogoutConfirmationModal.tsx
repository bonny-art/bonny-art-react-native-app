import React from "react";
import { Modal, Pressable, View } from "react-native";

import { useTheme } from "@/providers/theme/ThemeContext";
import { Text } from "@shared/ui/Text";
import { palette } from "@shared/lib/palette";
import { PrimaryButton } from "@shared/ui/PrimaryButton";

import {
  LOGOUT_MODAL_CANCEL_LABEL,
  LOGOUT_MODAL_CONFIRM_LABEL,
  LOGOUT_MODAL_MESSAGE,
  LOGOUT_MODAL_TITLE,
} from "./constants";
import { makeStyles } from "./styles";
import type { LogoutConfirmationModalProps } from "./types";

export function LogoutConfirmationModal({
  visible,
  onCancel,
  onConfirm,
}: LogoutConfirmationModalProps) {
  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={styles.backdropPressable}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Dismiss log out confirmation"
        >
          <View style={styles.overlay} />
        </Pressable>

        <View style={styles.modalCard} accessibilityRole="dialog">
          <Text style={styles.title}>{LOGOUT_MODAL_TITLE}</Text>
          <Text style={styles.message}>{LOGOUT_MODAL_MESSAGE}</Text>

          <View style={styles.actions}>
            <PrimaryButton
              title={LOGOUT_MODAL_CANCEL_LABEL}
              variant="outline"
              fullWidth
              onPress={onCancel}
              style={styles.actionButton}
            />
            <PrimaryButton
              title={LOGOUT_MODAL_CONFIRM_LABEL}
              fullWidth
              onPress={onConfirm}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
