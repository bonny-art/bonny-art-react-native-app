import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useTheme } from "@/providers/theme/ThemeContext";
import { PATHS } from "@/navigation/routes";
import { HeroCarousel } from "@/features/home/ui/HeroCarousel";
import { LoginForm } from "@/features/auth/login";
import { fetchRandomProductsKnownTotal } from "@/entities/product/api";
import type { Product } from "@/entities/product/model";
import { Text } from "@shared/ui/Text";
import { palette } from "@shared/lib/palette";
import { spacing } from "@shared/lib/tokens";

import type { LoginScreenProps } from "./types";
import { makeStyles } from "./styles";

export default function LoginScreen(_props: LoginScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);

  const [heroProducts, setHeroProducts] = useState<Product[]>([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const random = await fetchRandomProductsKnownTotal(5);
        if (!alive) return;
        setHeroProducts(random);
      } catch (err: any) {
        console.warn(
          "loginScreen: hero fetch failed",
          err?.response?.status ?? err?.message ?? String(err)
        );
        if (!alive) return;
        setHeroProducts([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const paddingBottom = insets.bottom + spacing.xxl;

  const handleSignUp = () => {
    router.push(PATHS.AUTH_SIGN_UP);
  };

  const handleSuccess = () => {
    router.replace(PATHS.TABS);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.heroSection}>
            {heroProducts.length > 0 ? (
              <HeroCarousel
                products={heroProducts}
                count={Math.min(heroProducts.length, 5)}
                height={220}
              />
            ) : null}
          </View>

          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.title}>Welcome to PatternShop!</Text>
              <Text style={styles.subtitle}>
                Sign in to unlock even more conveniences throughout the app.
              </Text>
            </View>

            <LoginForm onSuccess={handleSuccess} style={styles.form} />

            <View style={styles.registerRow}>
              <Text style={styles.promptText}>Not a member?</Text>
              <Pressable
                onPress={handleSignUp}
                accessibilityRole="button"
                accessibilityLabel="Go to sign up"
                hitSlop={8}
              >
                <Text style={styles.promptLink}>Sign up now</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
