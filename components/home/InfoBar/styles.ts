import { StyleSheet } from "react-native";
import { palette } from "@/constants/palette";
import { INFOBAR_H, GAP, PADDING_H } from "./constants";

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
