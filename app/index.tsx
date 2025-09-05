import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { spacing } from "@/constants/tokens";
import OrderStepper from "@/components/ui/OrderStepper";
import { vscale } from "@/constants/responsive";
import IconButton from "@/components/ui/IconButton";
import UserAvatar from "@/components/ui/UserAvatar";

export default function Index() {
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <PrimaryButton title="Add to cart" onPress={() => {}} fullWidth />
          <View style={{ height: spacing.md }} />
          <PrimaryButton title="Checkout" size="lg" onPress={() => {}} />
          <View style={{ height: spacing.md }} />
          <PrimaryButton title="Continue" loading />
          <View style={{ height: spacing.md }} />
          <PrimaryButton title="Disabled" disabled />

          <View style={[styles.section, styles.row]}>
            <PrimaryButton
              title="Cancel"
              variant="outline"
              style={styles.half}
            />
            <PrimaryButton
              title="Continue"
              variant="solid"
              style={styles.half}
            />
          </View>
        </View>

        <View style={[styles.section, styles.stepSection]}>
          <OrderStepper
            steps={["Your cart", "Order", "Success"]}
            currentStep={step}
            onStepPress={setStep}
            showLabels
          />

          <View style={{ height: spacing.xl }} />

          <PrimaryButton
            title="Next step"
            onPress={() => setStep((s) => Math.min(s + 1, 3))}
            fullWidth
          />
        </View>

        <View style={[styles.section, styles.iconRow]}>
          <IconButton
            icon="heart"
            variant="solid"
            size="md"
            selected
            onPress={() => {}}
          />
          <IconButton
            icon="heart"
            variant="outline"
            size="md"
            onPress={() => {}}
          />
          <IconButton
            icon="search"
            variant="solid"
            size="md"
            onPress={() => {}}
          />
          <IconButton
            icon="cart"
            variant="ghost"
            size="md"
            badgeCount={3}
            onPress={() => {}}
          />
        </View>

        <View
          style={[styles.section, { alignItems: "center", gap: spacing.lg }]}
        >
          <UserAvatar size="lg" showEditBadge onEditPress={() => {}} />
          <UserAvatar
            size="md"
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          />
          <UserAvatar size="sm" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  // важливо: стилі тепер на contentContainer, а не на кореневому View
  scrollContent: {
    padding: spacing.xl,
    gap: spacing.md,
    flexGrow: 1, // центр на великих екранах
    justifyContent: "center",
    paddingBottom: vscale(spacing.xxl), // запас знизу для прокрутки
  },
  section: {
    paddingVertical: vscale(spacing.xxl),
    alignSelf: "stretch",
  },
  stepSection: {
    alignSelf: "stretch",
  },
  iconRow: {
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md, // якщо ‘gap’ не працює, див. варіант 2
  },
  half: { flex: 1 },
});
