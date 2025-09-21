import { useTheme } from "@/providers/theme/ThemeContext";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import type { FlatList } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { DEFAULT_COUNT, DEFAULT_HEIGHT } from "./constants";
import { makeStyles } from "./styles";
import type { HeroCarouselProps } from "./types";
import { getItemLayoutFactory, makeLoopData, pickRandom } from "./utils";
import { toProductModal } from "@/navigation/routes";

/**
 * Displays a looping hero carousel of highlighted products with autoplay and dots.
 */
export function HeroCarousel({
  products,
  count = DEFAULT_COUNT,
  height = DEFAULT_HEIGHT,
}: HeroCarouselProps) {
  const { currentTheme: scheme } = useTheme();

  const { width } = useWindowDimensions();
  const PAGE_W = width;

  const s = useMemo(
    () => makeStyles(scheme, PAGE_W, height),
    [scheme, PAGE_W, height]
  );

  const safeProducts = useMemo(() => products ?? [], [products]);
  const hasProducts = safeProducts.length > 0;

  const idsKey = useMemo(
    () => safeProducts.map((p) => p.id).join(","),
    [safeProducts]
  );
  const slidesRef = useRef<typeof safeProducts>([]);
  const prevKeyRef = useRef<string>("");

  if (prevKeyRef.current !== `${idsKey}|${count}`) {
    prevKeyRef.current = `${idsKey}|${count}`;
    slidesRef.current = pickRandom(
      safeProducts,
      Math.min(count, safeProducts.length)
    );
  }
  const slides = slidesRef.current;

  const data = useMemo(
    () => (slides.length > 0 ? makeLoopData(slides) : []),
    [slides]
  );

  const activeRef = useRef(0);
  const activeSV = useSharedValue(0);

  const listRef = useRef<FlatList>(null);
  const getItemLayout = getItemLayoutFactory(PAGE_W);

  useEffect(() => {
    if (data.length > 1) {
      const timeoutId = setTimeout(() => {
        listRef.current?.scrollToIndex({ index: 1, animated: false });
        activeRef.current = 0;
        activeSV.value = 0;
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    activeRef.current = 0;
    activeSV.value = 0;
  }, [data.length, activeSV]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const page = Math.round(e.nativeEvent.contentOffset.x / PAGE_W);

      if (slides.length <= 1) {
        activeRef.current = 0;
        activeSV.value = 0;
        return;
      }

      if (page === 0) {
        listRef.current?.scrollToIndex({
          index: slides.length,
          animated: false,
        });
        activeRef.current = slides.length - 1;
        activeSV.value = slides.length - 1;
      } else if (page === slides.length + 1) {
        listRef.current?.scrollToIndex({ index: 1, animated: false });
        activeRef.current = 0;
        activeSV.value = 0;
      } else {
        const idx = page - 1;
        activeRef.current = idx;
        activeSV.value = idx;
      }
    },
    [PAGE_W, slides.length, activeSV]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      const next = (activeRef.current + 1) % slides.length;
      listRef.current?.scrollToIndex({ index: next + 1, animated: true });
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const renderItem = useCallback(
    ({ item }: { item: { id: string; imageUrl: string } }) => (
      <Pressable
        onPress={() => router.push(toProductModal(item.id))}
        style={s.slide}
      >
        <Image source={{ uri: item.imageUrl }} style={s.image} />
      </Pressable>
    ),
    [s.image, s.slide]
  );

  const keyExtractor = useCallback(
    (_: unknown, idx: number) => `hero-${idx}`,
    []
  );

  const Dot = ({ index }: { index: number }) => {
    const style = useAnimatedStyle(() => {
      const isActive = activeSV.value === index;
      return {
        opacity: withTiming(isActive ? 1 : 0.28),
        transform: [{ scale: withTiming(isActive ? 1 : 0.8) }],
      };
    });
    return <Animated.View style={[s.dot, style]} />;
  };

  if (!hasProducts || slides.length === 0) {
    return null;
  }

  return (
    <View style={s.root}>
      <View style={s.frame}>
        <Animated.FlatList
          ref={listRef}
          data={data}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={getItemLayout}
          initialScrollIndex={data.length > 1 ? 1 : 0}
          onMomentumScrollEnd={onMomentumEnd}
          decelerationRate="fast"
          renderItem={renderItem}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={2}
          removeClippedSubviews
        />

        {slides.length > 1 && (
          <View style={s.dotsWrapper}>
            <View style={s.dotsRow}>
              {slides.map((_, i) => (
                <Dot key={`dot-${i}`} index={i} />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
