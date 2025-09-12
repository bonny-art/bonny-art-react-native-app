import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { spacing } from "@/shared/lib/tokens";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { toCartOrder } from "@/navigation/routes";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/features/cart/model/selectors";
import { Text } from "@/shared/ui/Text";

export default function CartScreen() {
  const items = useSelector(selectCartItems);

  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.xl }}>
      {/* TODO: список позицій + сума */}
      <View style={{ flex: 1, gap: 8 }}>
        {items.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          items.map((id) => <Text key={id}>{id}</Text>)
        )}
      </View>

      <View style={{ marginTop: "auto" }}>
        <PrimaryButton
          title="Checkout"
          onPress={() => router.push(toCartOrder())}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}
