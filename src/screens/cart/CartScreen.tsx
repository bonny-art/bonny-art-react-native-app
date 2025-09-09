import { PrimaryButton } from "@/shared/ui/PrimaryButton";
import { spacing } from "@/shared/lib/tokens";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { toCartOrder } from "@/navigation/routes";

export default function CartScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: spacing.xl }}>
      {/* TODO: список позицій + сума */}
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
