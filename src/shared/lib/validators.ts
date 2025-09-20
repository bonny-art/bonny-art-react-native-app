import { ref, string } from "yup";

const NAME_REGEX = /^[A-Za-z\u0400-\u04FF'’ -]+$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[^\s]{8,16}$/;

type StringValidator = () => ReturnType<typeof string>;

type ValidatorsMap = {
  name: StringValidator;
  email: StringValidator;
  password: StringValidator;
  confirmPassword: StringValidator;
};

export const validators = {
  name: () =>
    string()
      .trim()
      .required("Name is required.")
      .matches(NAME_REGEX, "Use Ukrainian or Latin letters."),
  email: () =>
    string()
      .trim()
      .required("Email is required.")
      .matches(EMAIL_REGEX, "Enter a valid email address."),
  password: () =>
    string()
      .required("Password is required.")
      .matches(
        PASSWORD_REGEX,
        "Password must be 8-16 characters without spaces."
      ),
  confirmPassword: () =>
    string()
      .required("Confirm your password.")
      .oneOf([ref("password")], "Passwords do not match."),
} satisfies ValidatorsMap;

export const NAME_PATTERN = NAME_REGEX;
export const EMAIL_PATTERN = EMAIL_REGEX;
export const PASSWORD_PATTERN = PASSWORD_REGEX;
