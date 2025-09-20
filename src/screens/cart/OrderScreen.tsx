import { useEffect, useMemo, useState, useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";
import { Text } from "@shared/ui/Text";
import { TextField } from "@/shared/ui/TextField";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { PATHS, toCartSuccess } from "@/navigation/routes";
import { selectCartItems } from "@/features/cart/model/selectors";
import { clear } from "@/store/cartSlice";
import { fetchProductById } from "@/entities/product/api";
import {
  selectAuthState,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/entities/user/model";
import type { AppDispatch } from "@/store";

export default function OrderScreen() {
  const { currentTheme: scheme } = useTheme();
  const styles = useMemo(() => createStyles(scheme), [scheme]);
  const goToStep = useCartStepNav();
  const currentStep = 1;
  const items = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { initializing } = useSelector(selectAuthState);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [country, setCountry] = useState("Ukraine");
  const [comments, setComments] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all(
      items.map((it) => fetchProductById(it.productId).catch(() => null))
    ).then((res) => {
      if (!alive) return;
      const sum = res.reduce((acc, prod) => {
        if (!prod) return acc;
        const q = items.find((i) => i.productId === prod.id)?.qty ?? 0;
        return acc + (prod.price ?? 0) * q;
      }, 0);
      setTotal(sum);
    });
    return () => {
      alive = false;
    };
  }, [items]);

  useEffect(() => {
    if (!initializing && !isAuthenticated) {
      router.replace(PATHS.AUTH_LOGIN);
    }
  }, [initializing, isAuthenticated]);

  useEffect(() => {
    setEmail(currentUser?.email ?? "");
  }, [currentUser?.email]);

  const handleCancel = useCallback(() => {
    goToStep(0);
  }, [goToStep]);

  const handleContinue = useCallback(() => {
    if (!isAuthenticated) {
      router.replace(PATHS.AUTH_LOGIN);
      return;
    }
    dispatch(clear());
    router.push(toCartSuccess(total));
  }, [dispatch, isAuthenticated, total]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handleCountryChange = useCallback((value: string) => {
    setCountry(value);
  }, []);

  const handleCommentsChange = useCallback((value: string) => {
    setComments(value);
  }, []);

  const handleAgreeChange = useCallback((value: boolean) => {
    setAgreed(value);
  }, []);

  return (
    <ScreenWithFooter
      footer={{
        label: "Continue",
        onPress: handleContinue,
        disabled: items.length === 0,
      }}
      contentPadding={spacing.xl}
      scroll
    >
      <Pressable onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
      <OrderStepper
        steps={["Your cart", "Order", "Success"]}
        currentStep={currentStep}
        showLabels
        onStepPress={(i: number) => {
          if (i <= currentStep) goToStep(i);
        }}
        style={styles.stepper}
      />
      <View style={styles.introBlock}>
        <Text style={styles.introTitle}>Leave your contact data</Text>
        <Text style={styles.introSubtitle}>
          Manager will contact you soon after receiving your order.
        </Text>
      </View>

      <View style={styles.formBlock}>
        <TextField
          label="Email to contact and deliver patterns"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
        />

        <TextField
          label="Country (for choosing payment method)"
          value={country}
          onChangeText={handleCountryChange}
          placeholder="Country"
        />

        <TextField
          label="Comments to the Order"
          value={comments}
          onChangeText={handleCommentsChange}
          placeholder="Leave your comments"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          inputStyle={styles.commentsInput}
        />

        <View style={styles.checkboxRow}>
          <Checkbox checked={agreed} onChange={handleAgreeChange} />
          <View style={styles.checkboxTextWrapper}>
            <Text style={styles.checkboxText}>
              I agree that each purchased pattern is for personal use only.
            </Text>
            <Pressable onPress={() => {}}>
              <Text style={styles.readMoreText}>[Read more]</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWithFooter>
  );
}

const createStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    cancelButton: {
      alignSelf: "flex-start",
    },
    cancelText: {
      ...typography.action.m,
      color: p.highlight.medium,
    },
    stepper: {
      marginTop: spacing.md,
    },
    introBlock: {
      marginTop: spacing.xl,
      gap: spacing.sm,
    },
    introTitle: {
      ...typography.heading.h2,
      color: p.neutral.light.light,
      fontWeight: "600",
    },
    introSubtitle: {
      ...typography.body.m,
      color: p.neutral.light.dark,
    },
    formBlock: {
      marginTop: spacing.xl,
      gap: spacing.lg,
    },
    commentsInput: {
      minHeight: 120,
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm,
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.md,
    },
    checkboxTextWrapper: {
      flex: 1,
      gap: spacing.xs,
    },
    checkboxText: {
      ...typography.body.m,
      color: p.neutral.light.light,
    },
    readMoreText: {
      ...typography.body.m,
      color: p.highlight.medium,
      fontWeight: "600",
    },
  });
};
