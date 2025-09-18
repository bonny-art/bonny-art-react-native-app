import React from "react";
import { Modal, Pressable, View } from "react-native";

import { useTheme } from "@/providers/theme/ThemeContext";
import { Text } from "@shared/ui/Text";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { palette } from "@shared/lib/palette";

import { makeStyles } from "./styles";
import type { ActionModalProps } from "./types";

export function ActionModal({
  visible,
  title,
  message,
  confirmAction,
  cancelAction,
  onRequestClose,
  dismissAccessibilityLabel,
  testID,
}: ActionModalProps) {
  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);

  const handleDismiss = onRequestClose ?? cancelAction?.onPress;
  const dismissLabel =
    dismissAccessibilityLabel ??
    cancelAction?.accessibilityLabel ??
    cancelAction?.label ??
    "Dismiss modal";

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleDismiss}
      testID={testID}
    >
      <View style={styles.backdrop}>
        <Pressable
          style={styles.backdropPressable}
          onPress={handleDismiss}
          accessibilityRole="button"
          accessibilityLabel={dismissLabel}
        >
          <View style={styles.overlay} />
        </Pressable>

        <View
          style={styles.modalCard}
          accessibilityRole="alert"
          accessibilityViewIsModal
        >
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            {cancelAction ? (
              <PrimaryButton
                title={cancelAction.label}
                onPress={cancelAction.onPress}
                variant={cancelAction.variant ?? "outline"}
                fullWidth
                style={styles.actionButton}
                testID={cancelAction.testID}
                accessibilityLabel={
                  cancelAction.accessibilityLabel ?? cancelAction.label
                }
              />
            ) : null}

            <PrimaryButton
              title={confirmAction.label}
              onPress={confirmAction.onPress}
              variant={confirmAction.variant ?? "solid"}
              fullWidth
              style={styles.actionButton}
              testID={confirmAction.testID}
              accessibilityLabel={
                confirmAction.accessibilityLabel ?? confirmAction.label
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
