import React from "react";
import { View, Text } from "react-native";
import { spacing } from "@/constants/tokens";
import { router } from "expo-router";

export default function SearchModal() {
  return (
    <View style={{ flex: 1, padding: spacing.xl }}>
      {/* TODO: інпут + recent searches */}
      <Text onPress={() => router.back()}>Close</Text>
    </View>
  );
}
