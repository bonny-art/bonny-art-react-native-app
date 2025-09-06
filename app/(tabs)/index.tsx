import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import PrimaryButton from "@/components/ui/PrimaryButton/PrimaryButton";
import { spacing } from "@/constants/tokens";
import OrderStepper from "@/components/ui/OrderStepper";
import { scale, vscale } from "@/constants/responsive";
import IconButton from "@/components/ui/IconButton";
import UserAvatar from "@/components/ui/UserAvatar";
import products from "@/store/products.json";
import ProductCard from "@/components/ProductCard";
import FilterChip from "@/components/ui/FilterChip";

export default function Index() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <>
            <FilterChip
              label="Category"
              iconLeft="filter"
              counter={3}
              variant="trigger" // ✅
              selected={false} // неважливо для trigger
              onPress={() => setOpen(true)}
            />

            <Modal visible={open} onRequestClose={() => setOpen(false)}>
              {/* контент фільтрів */}
            </Modal>
          </>
          <View style={{ height: spacing.md }} />

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            <FilterChip
              label="Size XL"
              selected={false}
              onPress={() => {}}
              disabled
            />

            <FilterChip
              label="Green"
              selected={selected}
              onPress={() => setSelected(!selected)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <FlatList
            horizontal
            data={products}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
              <ProductCard
                variant="tile"
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                favorite={item.favorite}
                onToggleFavorite={() => {}}
                onPress={() => {}}
                width={scale(156)}
              />
            )}
            contentContainerStyle={{ gap: spacing.lg, padding: spacing.xl }}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: vscale(spacing.xl) }}
          />
        </View>

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
