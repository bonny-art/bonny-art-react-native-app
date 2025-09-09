import { StyleSheet } from "react-native";
import { palette } from "@shared/lib/palette";
import { H_GAP } from "./constants";
import {
  DOT_SIZE,
  DOT_SIZE_COMPACT,
} from "@features/cart/ui/OrderStepper/constants";

export const makeStepCircleStyles = (
  scheme: keyof typeof palette,
  compact?: boolean
) => {
  const DOT = compact ? DOT_SIZE_COMPACT : DOT_SIZE;

  return StyleSheet.create({
    root: {
      alignItems: "center",
      marginHorizontal: H_GAP,
    },
    dotBase: {
      width: DOT,
      height: DOT,
      borderRadius: DOT / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    dotText: {
      fontWeight: "600",
    },
    label: {
      textAlign: "center",
    },
  });
};
