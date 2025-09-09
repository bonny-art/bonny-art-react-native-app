import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";

import { DEFAULT_COUNT, DEFAULT_HEIGHT, DOT_BOTTOM } from "./constants";
import { makeStyles } from "./styles";
import type { HeroCarouselProps } from "./types";
import { getItemLayoutFactory, makeLoopData, pickRandom } from "./utils";
import { toProductModal } from "@/navigation/routes";

export function HeroCarousel({
  products,
  count = DEFAULT_COUNT,
  height = DEFAULT_HEIGHT,
}: HeroCarouselProps) {
  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);

  const slides = useMemo(
    () => pickRandom(products, Math.min(count, products.length)),
    [products, count]
  );
  const data = useMemo(() => makeLoopData(slides), [slides]);

  const { width } = useWindowDimensions();
  const PAGE_W = width;

  const listRef = useRef<FlatList>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (data.length > 1) {
      setTimeout(
        () => listRef.current?.scrollToIndex({ index: 1, animated: false }),
        0
      );
    }
  }, [data.length]);

  const getItemLayout = getItemLayoutFactory(PAGE_W);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / PAGE_W);
    if (slides.length <= 1) {
      setActive(0);
      return;
    }
    if (page === 0) {
      listRef.current?.scrollToIndex({ index: slides.length, animated: false });
      setActive(slides.length - 1);
    } else if (page === slides.length + 1) {
      listRef.current?.scrollToIndex({ index: 1, animated: false });
      setActive(0);
    } else {
      setActive(page - 1);
    }
  };

  return (
    <View style={s.root}>
      <View style={{ width: PAGE_W, height }}>
        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(_, idx) => `hero-${idx}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={getItemLayout}
          initialScrollIndex={data.length > 1 ? 1 : 0}
          onMomentumScrollEnd={onMomentumEnd}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(toProductModal(item.id))}
              style={{ width: PAGE_W, height }}
            >
              <Image source={{ uri: item.imageUrl }} style={s.image} />
            </Pressable>
          )}
        />

        {slides.length > 1 && (
          <View style={[s.dotsWrapper, { bottom: DOT_BOTTOM }]}>
            <View style={s.dotsRow}>
              {slides.map((_, i) => (
                <View
                  key={`dot-${i}`}
                  style={[s.dot, i === active && s.dotActive]}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
