const NAME_REGEX = /^[A-Za-z\u0400-\u04FF'’ -]+$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[^\s]{8,16}$/;

export const validators = {
  name: NAME_REGEX,
  email: EMAIL_REGEX,
  password: PASSWORD_REGEX,
} as const;

export const validateName = (value: string): string | undefined => {
  const normalized = value.trim();
  if (!normalized) {
    return "Name is required.";
  }
  if (!validators.name.test(normalized)) {
    return "Use Ukrainian or Latin letters, apostrophes, hyphen or spaces.";
  }
  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  const normalized = value.trim();
  if (!normalized) {
    return "Email is required.";
  }
  if (!validators.email.test(normalized)) {
    return "Enter a valid email address.";
  }
  return undefined;
};

export const validatePassword = (value: string): string | undefined => {
  if (!value) {
    return "Password is required.";
  }
  if (!validators.password.test(value)) {
    return "Password must be 8-16 characters without spaces.";
  }
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmation: string
): string | undefined => {
  if (!confirmation) {
    return "Confirm your password.";
  }
  if (password !== confirmation) {
    return "Passwords do not match.";
  }
  return undefined;
};
