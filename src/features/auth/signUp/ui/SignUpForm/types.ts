import type { StyleProp, ViewStyle } from "react-native";

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type SignUpFormProps = {
  onNavigateToExplore?: () => void;
  style?: StyleProp<ViewStyle>;
};
