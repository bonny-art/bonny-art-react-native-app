import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { palette } from "@shared/lib/palette";

export function getDrawerOptions(
  scheme: string,
  insets: { bottom: number },
  screenW: number
): DrawerNavigationOptions {
  const p = palette[scheme as keyof typeof palette];
  const drawerWidth = Math.min(screenW * 0.9, 420);

  return {
    headerShown: false,
    drawerType: "front",
    drawerPosition: "left",
    swipeEdgeWidth: 100,
    overlayColor: "rgba(0,0,0,0.45)",
    drawerStyle: {
      width: drawerWidth,
      backgroundColor: p.neutral.light.darkest,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      paddingBottom: insets.bottom,
    },
  };
}
