import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";

import { useTheme } from "@/providers/theme/ThemeContext";
import { PATHS } from "@/navigation/routes";
import { palette } from "@shared/lib/palette";
import { Text } from "@shared/ui/Text";
import { IconSymbol } from "@shared/ui/IconSymbol";
import { SignUpForm } from "@/features/auth/signUp";

import type { SignUpScreenProps } from "./types";
import { makeStyles } from "./styles";

export default function SignUpScreen(_props: SignUpScreenProps) {
  const router = useRouter();
  const navigation = useNavigation();
  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);
  const p = palette[scheme];

  const handleBack = () => {
    if (
      typeof navigation?.canGoBack === "function" &&
      navigation.canGoBack() &&
      typeof navigation.goBack === "function"
    ) {
      navigation.goBack();
      return;
    }
    router.replace(PATHS.AUTH_LOGIN);
  };

  const handleLoginNavigate = () => {
    router.replace(PATHS.AUTH_LOGIN);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={handleBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <IconSymbol
              name="chevron-left"
              size={24}
              color={p.neutral.light.lightest}
            />
          </Pressable>

          <View>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>
              Create an account to get started
            </Text>
          </View>

          <View style={styles.formWrapper}>
            <SignUpForm
              onNavigateToExplore={() => router.replace(PATHS.TABS)}
            />
          </View>

          <View style={styles.loginPrompt}>
            <Text style={styles.promptText}>Already have an account?</Text>
            <Pressable onPress={handleLoginNavigate} accessibilityRole="button">
              <Text style={styles.promptLink}>Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
