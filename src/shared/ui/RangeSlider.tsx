import React, { useCallback, useEffect, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export type RangeSliderProps = {
  min: number;
  max: number;
  values: [number, number];
  onChange: (values: [number, number]) => void;
};

export function RangeSlider({ min, max, values, onChange }: RangeSliderProps) {
  const [width, setWidth] = useState(0);

  // shared values for pixels
  const trackW = useSharedValue(0);
  const left = useSharedValue(0);
  const right = useSharedValue(0);

  // capture handle position at gesture start
  const leftStart = useSharedValue(0);
  const rightStart = useSharedValue(0);

  const pxFromVal = useCallback(
    (v: number) => ((v - min) / (max - min)) * (trackW.value || 1),
    [min, max, trackW]
  );

  const syncFromValues = useCallback(() => {
    if (!width) return;
    trackW.value = width;
    left.value = pxFromVal(values[0]);
    right.value = pxFromVal(values[1]);
  }, [values, width, pxFromVal, trackW, left, right]);
  useEffect(() => {
    syncFromValues();
  }, [syncFromValues]);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    trackW.value = w;
    // перевиставляємо позиції при зміні ширини
    left.value = pxFromVal(values[0]);
    right.value = pxFromVal(values[1]);
  };

  // JS-функція для onChange (викликається з worklet через runOnJS)
  const emitChange = (leftPx: number, rightPx: number, w: number) => {
    const range = max - min || 1;
    const low = Math.round((leftPx / w) * range + min);
    const high = Math.round((rightPx / w) * range + min);
    onChange([low, high]);
  };

  // LEFT gesture
  const leftPan = Gesture.Pan()
    .onStart(() => {
      leftStart.value = left.value;
    })
    .onUpdate((e) => {
      const w = trackW.value || 1;
      // clamp: [0, right]
      const next = Math.min(
        Math.max(leftStart.value + e.translationX, 0),
        right.value
      );
      left.value = next;
      // повідомляємо в JS
      runOnJS(emitChange)(left.value, right.value, w);
    });

  // RIGHT gesture
  const rightPan = Gesture.Pan()
    .onStart(() => {
      rightStart.value = right.value;
    })
    .onUpdate((e) => {
      const w = trackW.value || 1;
      // clamp: [left, w]
      const next = Math.max(
        Math.min(rightStart.value + e.translationX, w),
        left.value
      );
      right.value = next;
      runOnJS(emitChange)(left.value, right.value, w);
    });

  const leftStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: left.value }],
  }));
  const rightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: right.value }],
  }));
  const betweenStyle = useAnimatedStyle(() => ({
    left: left.value,
    width: right.value - left.value,
  }));

  return (
    <View onLayout={onLayout} style={{ height: 40, justifyContent: "center" }}>
      <View
        style={{
          height: 4,
          backgroundColor: "#ccc",
          position: "absolute",
          left: 0,
          right: 0,
          borderRadius: 2,
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            height: 4,
            backgroundColor: "#f2a900",
            borderRadius: 2,
          },
          betweenStyle,
        ]}
      />

      <GestureDetector gesture={leftPan}>
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#f2a900",
              top: -8,
            },
            leftStyle,
          ]}
        />
      </GestureDetector>

      <GestureDetector gesture={rightPan}>
        <Animated.View
          style={[
            {
              position: "absolute",
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#f2a900",
              top: -8,
            },
            rightStyle,
          ]}
        />
      </GestureDetector>
    </View>
  );
}
