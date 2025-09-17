import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

import { useTheme } from "@/providers/theme/ThemeContext";
import { PATHS } from "@/navigation/routes";
import {
  selectAuthInitializing,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { Text } from "@shared/ui/Text";
import { palette } from "@shared/lib/palette";

import type { AuthGateScreenProps } from "./types";
import { makeStyles } from "./styles";

export default function AuthGateScreen(_props: AuthGateScreenProps) {
  const initializing = useSelector(selectAuthInitializing);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);
  const p = palette[scheme];

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={p.highlight.medium} />
        <Text style={styles.message}>Loading experience…</Text>
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? PATHS.TABS : PATHS.AUTH_LOGIN} />;
}
