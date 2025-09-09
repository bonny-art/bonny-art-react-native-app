import { StyleProp, ViewStyle, ImageSourcePropType } from "react-native";

export type UserAvatarSize = "sm" | "md" | "lg";

export type UserAvatarProps = {
  source?: ImageSourcePropType;
  size?: UserAvatarSize;
  showEditBadge?: boolean;
  onPress?: () => void;
  onEditPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};
