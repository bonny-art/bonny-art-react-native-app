import { Alert, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import type { FormikHelpers } from "formik";
import { object, string } from "yup";
import { useRef } from "react";
import type { TextInput } from "react-native";

import { loginUser } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { selectAuthState } from "@/entities/user/model";
import { TextField } from "@shared/ui/TextField";
import { PrimaryButton } from "@shared/ui/PrimaryButton";

import { validators } from "@shared/lib/validators";

import { LOGIN_INITIAL_VALUES } from "./constants";
import type { LoginFormProps, LoginFormValues } from "./types";
import { makeStyles } from "./styles";

const loginSchema = object({
  email: string()
    .trim()
    .required("Email is required.")
    .matches(validators.email, "Enter a valid email address."),
  password: string()
    .required("Password is required.")
    .matches(
      validators.password,
      "Password must be 8-16 characters without spaces."
    ),
});

export function LoginForm({ onSuccess, style }: LoginFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector(selectAuthState);
  const styles = makeStyles();

  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = async (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await dispatch(
        loginUser({
          email: values.email.trim(),
          password: values.password,
        })
      ).unwrap();

      onSuccess?.();
    } catch (error: unknown) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : null;

      if (message === "NOT_FOUND" || message === "INVALID_CREDENTIALS") {
        Alert.alert(
          "Check your details",
          "We couldn't verify that email and password. Please try again."
        );
        helpers.setFieldTouched("email", true, false);
        helpers.setFieldTouched("password", true, false);
        helpers.setFieldError("password", "Incorrect email or password.");
        helpers.setFieldValue("password", "", false);
        return;
      }

      Alert.alert(
        "Login failed",
        message ?? "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUES}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      validateOnMount
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        isSubmitting,
        handleSubmit: submit,
        isValid,
      }) => {
        const loading = isSubmitting || status === "loading";
        const disabled = loading || !isValid;

        return (
          <View style={[styles.container, style]}>
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
              onSubmitEditing={() => passwordRef.current?.focus()}
              textContentType="emailAddress"
            />

            <TextField
              ref={passwordRef}
              label="Password"
              placeholder="Enter your password"
              value={values.password}
              onChangeText={(text) => setFieldValue("password", text)}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              isPassword
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={submit}
              textContentType="password"
            />

            <View style={styles.actions}>
              <PrimaryButton
                title="Login"
                onPress={submit}
                fullWidth
                loading={loading}
                disabled={disabled}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
