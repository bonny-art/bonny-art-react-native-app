import { palette } from "@shared/lib/palette";
import { StyleSheet } from "react-native";
import { GAP, INFOBAR_H, PADDING_H } from "./constants";

export const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];
  return StyleSheet.create({
    root: {
      height: INFOBAR_H,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: PADDING_H,
      backgroundColor: p.neutral.dark.darkest,
    },
    right: {
      flexDirection: "row",
      gap: GAP,
    },
  });
};
