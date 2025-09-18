import React from "react";
import { ActionModal } from "@/shared/ui/ActionModal";

import {
  LOGOUT_MODAL_CANCEL_LABEL,
  LOGOUT_MODAL_CONFIRM_LABEL,
  LOGOUT_MODAL_MESSAGE,
  LOGOUT_MODAL_TITLE,
} from "./constants";
import type { LogoutConfirmationModalProps } from "./types";

export function LogoutConfirmationModal({
  visible,
  onCancel,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <ActionModal
      visible={visible}
      title={LOGOUT_MODAL_TITLE}
      message={LOGOUT_MODAL_MESSAGE}
      onRequestClose={onCancel}
      dismissAccessibilityLabel="Dismiss log out confirmation"
      cancelAction={{
        label: LOGOUT_MODAL_CANCEL_LABEL,
        onPress: onCancel,
        variant: "outline",
      }}
      confirmAction={{
        label: LOGOUT_MODAL_CONFIRM_LABEL,
        onPress: onConfirm,
      }}
    />
  );
}
