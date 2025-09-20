import { router } from "expo-router";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductById } from "@/entities/product/api";
import {
  selectAuthState,
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/entities/user/model";
import { useCartStepNav } from "@/features/cart/lib/useCartStepNav";
import { selectCartItems } from "@/features/cart/model/selectors";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { PATHS, toCartSuccess } from "@/navigation/routes";
import { useTheme } from "@/providers/theme/ThemeContext";
import { spacing } from "@/shared/lib/tokens";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { TextField } from "@/shared/ui/TextField";
import type { AppDispatch } from "@/store";
import { clear } from "@/store/cartSlice";
import { Text } from "@shared/ui/Text";

import {
  ORDER_FORM_INITIAL_VALUES,
  ORDER_FORM_VALIDATION_SCHEMA,
  ORDER_STEPS,
} from "./constants";
import { makeStyles } from "./styles";
import type { OrderFormValues } from "./types";

export default function OrderScreen() {
  const { currentTheme: scheme } = useTheme();
  const styles = useMemo(() => makeStyles(scheme), [scheme]);
  const goToStep = useCartStepNav();
  const currentStep = 1;
  const items = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { initializing } = useSelector(selectAuthState);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState(0);

  const initialValues = useMemo(
    () => ({
      ...ORDER_FORM_INITIAL_VALUES,
      email: currentUser?.email ?? ORDER_FORM_INITIAL_VALUES.email,
    }),
    [currentUser?.email]
  );

  const formik = useFormik<OrderFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: ORDER_FORM_VALIDATION_SCHEMA,
    validateOnMount: true,
    onSubmit: (_values) => {
      if (!isAuthenticated) {
        router.replace(PATHS.AUTH_LOGIN);
        return;
      }
      dispatch(clear());
      router.push(toCartSuccess(total));
    },
  });

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

  const handleCancel = useCallback(() => {
    goToStep(0);
  }, [goToStep]);

  const handleAgreeChange = useCallback(
    (value: boolean) => {
      formik.setFieldValue("agreed", value);
      formik.setFieldTouched("agreed", true, false);
    },
    [formik]
  );

  return (
    <ScreenWithFooter
      footer={{
        label: "Continue",
        onPress: formik.submitForm,
        disabled: items.length === 0 || !formik.isValid || formik.isSubmitting,
      }}
      contentPadding={spacing.xl}
      contentStyle={styles.content}
      scroll={false}
    >
      <Pressable onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
      <OrderStepper
        steps={ORDER_STEPS}
        currentStep={currentStep}
        showLabels
        onStepPress={(i: number) => {
          if (i <= currentStep) goToStep(i);
        }}
        style={styles.stepper}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introBlock}>
          <Text style={styles.introTitle}>Leave your contact data</Text>
          <Text style={styles.introSubtitle}>
            Manager will contact you soon after receiving your order.
          </Text>
        </View>

        <View style={styles.formBlock}>
          <TextField
            label="Email to contact and deliver patterns"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <TextField
            label="Country (for choosing payment method)"
            value={formik.values.country}
            onChangeText={formik.handleChange("country")}
            onBlur={formik.handleBlur("country")}
            placeholder="Country"
            error={formik.errors.country}
            touched={formik.touched.country}
          />

          <TextField
            label="Comments to the Order"
            value={formik.values.comments}
            onChangeText={formik.handleChange("comments")}
            onBlur={formik.handleBlur("comments")}
            placeholder="Leave your comments"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={styles.commentsInput}
            error={formik.errors.comments}
            touched={formik.touched.comments}
          />

          <View style={styles.checkboxRow}>
            <Checkbox
              checked={formik.values.agreed}
              onChange={handleAgreeChange}
            />
            <View style={styles.checkboxTextWrapper}>
              <Text style={styles.checkboxText}>
                I agree that each purchased pattern is for personal use only.
              </Text>
              <Pressable onPress={() => {}}>
                <Text style={styles.readMoreText}>[Read more]</Text>
              </Pressable>
              {formik.touched.agreed && formik.errors.agreed ? (
                <Text style={styles.checkboxError}>{formik.errors.agreed}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWithFooter>
  );
}
