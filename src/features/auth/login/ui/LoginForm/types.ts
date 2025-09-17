import type { StyleProp, ViewStyle } from "react-native";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  onSuccess?: () => void;
  style?: StyleProp<ViewStyle>;
};
