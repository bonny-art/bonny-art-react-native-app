import { spacing } from "@/shared/lib/tokens";
import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "@shared/ui/Text";

export default function SearchModal() {
  return (
    <View style={{ flex: 1, padding: spacing.xl }}>
      {/* TODO: інпут + recent searches */}
      <Text onPress={() => router.back()}>Close</Text>
    </View>
  );
}
