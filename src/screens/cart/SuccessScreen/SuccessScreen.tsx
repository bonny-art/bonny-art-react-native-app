import { ScreenWithFooter } from "@/shared/ui/ScreenWithFooter";
import { OrderStepper } from "@/features/cart/ui/OrderStepper";
import { useTheme } from "@/providers/theme/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "@/shared/ui/Text";
import { toTabsRoot } from "@/navigation/routes";

import { makeStyles } from "./styles";
import {
  CURRENT_STEP_INDEX,
  FOOTER_LABEL,
  ORDER_INFO_TITLE,
  ORDER_NUMBER,
  ORDER_STATUS_TEXT,
  ORDER_STEPS,
  SUCCESS_DESCRIPTION,
  SUCCESS_SUBTITLE,
  SUCCESS_TITLE,
} from "./constants";

/**
 * Final cart step displaying order confirmation details and navigation back home.
 */
export default function SuccessScreen() {
  const { currentTheme: scheme } = useTheme();
  const styles = makeStyles(scheme);
  const { total: totalParam } = useLocalSearchParams<{ total?: string }>();
  const total = typeof totalParam === "string" ? parseFloat(totalParam) : 0;

  return (
    <ScreenWithFooter
      footer={{
        label: FOOTER_LABEL,
        onPress: () => router.replace(toTabsRoot()),
      }}
      scroll={false}
    >
      <OrderStepper
        steps={ORDER_STEPS}
        currentStep={CURRENT_STEP_INDEX}
        showLabels
      />

      <View style={styles.container}>
        <Text style={styles.title}>{SUCCESS_TITLE}</Text>
        <Text style={styles.subtitle}>{SUCCESS_SUBTITLE}</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{ORDER_INFO_TITLE}</Text>
          <Text style={styles.cardText}>Order Number: {ORDER_NUMBER}</Text>
          <Text style={styles.cardText}>Total: ${total.toFixed(2)}</Text>
          <Text style={styles.cardText}>{ORDER_STATUS_TEXT}</Text>
        </View>
        <Text style={styles.description}>{SUCCESS_DESCRIPTION}</Text>
      </View>
    </ScreenWithFooter>
  );
}
