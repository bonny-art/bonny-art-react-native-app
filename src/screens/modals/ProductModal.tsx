import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { spacing } from "@/shared/lib/tokens";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ProductModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: spacing.xl }}>
      <Pressable
        onPress={() => router.back()}
        style={{ alignSelf: "flex-end" }}
      >
        <Text>Close</Text>
      </Pressable>

      <Text
        style={{ fontWeight: "700", fontSize: 18, marginVertical: spacing.md }}
      >
        Product #{id}
      </Text>

      {/* TODO: gallery / description / price */}
      <PrimaryButton
        title="Add to cart"
        onPress={() => {
          /* addToCart(id) */
        }}
        fullWidth
      />
    </View>
  );
}
