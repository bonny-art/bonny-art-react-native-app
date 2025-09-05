import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { spacing } from "@/constants/tokens";
import OrderStepper from "@/components/ui/OrderStepper";
import { vscale } from "@/constants/responsive"; // ⬅️ для вертикальних паддінгів

export default function Index() {
  const [step, setStep] = useState(1);

  return (
    <View style={styles.screen}>
      <View style={styles.section}>
        <PrimaryButton title="Add to cart" onPress={() => {}} fullWidth />
        <View style={{ height: spacing.md }} />
        <PrimaryButton title="Checkout" size="lg" onPress={() => {}} />
        <View style={{ height: spacing.md }} />
        <PrimaryButton title="Continue" loading />
        <View style={{ height: spacing.md }} />
        <PrimaryButton title="Disabled" disabled />
      </View>

      <View style={[styles.section, styles.stepSection]}>
        <OrderStepper
          steps={["Cart", "Address", "Payment", "Review"]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "center",
    gap: spacing.md,
  },
  // спільний секційний контейнер з вертикальними паддінгами
  section: {
    paddingVertical: vscale(spacing.xxl),
  },
  // секція зі степпером (можна додатково розтягнути на всю ширину)
  stepSection: {
    alignSelf: "stretch",
  },
});
