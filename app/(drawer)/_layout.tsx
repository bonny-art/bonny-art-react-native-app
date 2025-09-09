import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { ProfileDrawerContent } from "@features/profile/ui/ProfileDrawerContent";
import { getDrawerOptions } from "@/navigation/drawerOptions";
import { SEGMENTS } from "@/navigation/routes";

export default function DrawerLayout() {
  const scheme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();
  const screenW = Dimensions.get("window").width;

  return (
    <Drawer
      screenOptions={getDrawerOptions(scheme, insets, screenW)}
      drawerContent={(props) => <ProfileDrawerContent {...props} />}
    >
      <Drawer.Screen name={SEGMENTS.TABS} options={{ drawerLabel: "Home" }} />
    </Drawer>
  );
}
