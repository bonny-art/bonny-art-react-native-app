import { Alert, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import { boolean, object } from "yup";

import { useTheme } from "@/providers/theme/ThemeContext";
import { registerUser } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { selectAuthState } from "@/entities/user/model";
import { TextField } from "@shared/ui/TextField";
import { Checkbox } from "@shared/ui/Checkbox";
import { PrimaryButton } from "@shared/ui/PrimaryButton";
import { Text } from "@shared/ui/Text";
import { palette } from "@shared/lib/palette";

import { validators } from "@shared/lib/validators";

import { SIGN_UP_INITIAL_VALUES } from "./constants";
import type { SignUpFormProps, SignUpFormValues } from "./types";
import { makeStyles } from "./styles";

const signUpSchema = object({
  name: validators.name(),
  email: validators.email(),
  password: validators.password(),
  confirmPassword: validators.confirmPassword(),
  acceptTerms: boolean().oneOf(
    [true],
    "You must accept the terms to continue."
  ),
});

export function SignUpForm({ onNavigateToExplore, style }: SignUpFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector(selectAuthState);
  const { currentTheme } = useTheme();
  const scheme = currentTheme as keyof typeof palette;
  const styles = makeStyles(scheme);

  const handleSubmit = async (
    values: SignUpFormValues,
    helpers: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      await dispatch(
        registerUser({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        })
      ).unwrap();

      helpers.resetForm({ values: SIGN_UP_INITIAL_VALUES });
      onNavigateToExplore?.();
    } catch (error: unknown) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : null;

      if (message === "EMAIL_TAKEN") {
        Alert.alert(
          "Email already in use",
          "This email address is already linked to an account."
        );
        helpers.setFieldError("email", "This email is already in use.");
        helpers.setFieldValue("password", "", false);
        helpers.setFieldValue("confirmPassword", "", false);
        helpers.setFieldTouched("password", false, false);
        helpers.setFieldTouched("confirmPassword", false, false);
        return;
      }

      Alert.alert(
        "Sign up failed",
        message ?? "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <Formik
      initialValues={SIGN_UP_INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}
      validateOnBlur
      validateOnChange
      validateOnMount
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleBlur,
        isSubmitting,
        handleSubmit: submit,
        isValid,
      }) => {
        const termsError =
          touched.acceptTerms && !values.acceptTerms && errors.acceptTerms
            ? errors.acceptTerms
            : null;
        const loading = isSubmitting || status === "loading";
        const disabled = loading || !isValid || !values.acceptTerms;

        const toggleTerms = () => {
          const next = !values.acceptTerms;
          setFieldValue("acceptTerms", next);
          setFieldTouched("acceptTerms", true, false);
        };

        return (
          <View style={[styles.container, style]}>
            <TextField
              label="Name"
              placeholder="Your full name"
              autoCapitalize="words"
              autoComplete="name"
              value={values.name}
              onChangeText={(text) => setFieldValue("name", text)}
              onBlur={handleBlur("name")}
              error={errors.name}
              touched={touched.name}
              returnKeyType="next"
            />

            <TextField
              label="Email Address"
              placeholder="name@email.com"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={(text) => setFieldValue("email", text)}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              returnKeyType="next"
            />

            <TextField
              label="Password"
              placeholder="Create a password"
              value={values.password}
              onChangeText={(text) => setFieldValue("password", text)}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              isPassword
              autoComplete="password"
              returnKeyType="next"
            />

            <TextField
              label="Confirm Password"
              placeholder="Confirm the password"
              value={values.confirmPassword}
              onChangeText={(text) => setFieldValue("confirmPassword", text)}
              onBlur={handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              isPassword
              autoComplete="password"
              returnKeyType="done"
            />

            <View style={styles.checkboxSection}>
              <Pressable
                style={styles.checkboxRow}
                onPress={toggleTerms}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: values.acceptTerms }}
              >
                <Checkbox
                  checked={values.acceptTerms}
                  onChange={(next) => {
                    setFieldValue("acceptTerms", next);
                    setFieldTouched("acceptTerms", true, false);
                  }}
                  size="md"
                />
                <View style={styles.checkboxLabel}>
                  <Text style={styles.legalText}>
                    {"I've read and agree with the "}
                    <Text style={styles.legalHighlight}>
                      Terms and Conditions
                    </Text>
                    {" and the "}
                    <Text style={styles.legalHighlight}>Privacy Policy</Text>.
                  </Text>
                </View>
              </Pressable>
              {termsError ? (
                <Text style={styles.checkboxError}>{termsError}</Text>
              ) : null}
            </View>

            <PrimaryButton
              title="Sign up"
              onPress={() => submit()}
              fullWidth
              loading={loading}
              disabled={disabled}
            />
          </View>
        );
      }}
    </Formik>
  );
}
