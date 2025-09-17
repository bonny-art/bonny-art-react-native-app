import { View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/providers/theme/ThemeContext";
import { PATHS } from "@/navigation/routes";
import { Text } from "@shared/ui/Text";
import { PrimaryButton } from "@shared/ui/PrimaryButton";
import { palette } from "@shared/lib/palette";

import type { LoginScreenProps } from "./types";
import { makeStyles } from "./styles";

export default function LoginScreen(_props: LoginScreenProps) {
  const router = useRouter();
  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);

  const handleSignUp = () => {
    router.push(PATHS.AUTH_SIGN_UP);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>
            Access personalised offers and keep your cart across devices.
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Register"
            onPress={handleSignUp}
            fullWidth
            accessibilityLabel="Go to sign up"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
