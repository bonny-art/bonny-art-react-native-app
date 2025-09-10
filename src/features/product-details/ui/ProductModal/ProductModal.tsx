import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { PrimaryButton } from "@/shared/ui/PrimaryButton/PrimaryButton";
import { IconButton } from "@/shared/ui/IconButton";
import { spacing } from "@/shared/lib/tokens";
import { useColorScheme } from "@shared/hooks/useColorScheme";
import { palette } from "@shared/lib/palette";

import {
  fetchProductById,
  toggleProductFavorite,
} from "@/entities/product/api";

import { GALLERY_HEIGHT } from "./constants";
import { makeStyles } from "./styles";
import type { ProductModalProps, ProductState } from "./types";

const screenW = Dimensions.get("window").width;

export default function ProductModal(_props: ProductModalProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const scheme = (useColorScheme() ?? "light") as keyof typeof palette;
  const s = makeStyles(scheme);
  const p = palette[scheme];

  const [data, setData] = useState<ProductState>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);
  const [page, setPage] = useState(0);

  const scRef = useRef<ScrollView>(null);

  // fetch product by id
  useEffect(() => {
    let alive = true;
    setLoading(true);

    fetchProductById(String(id))
      .then((res) => alive && setData(res))
      .catch((e) =>
        console.warn(
          "ProductModal: fetchProductById failed:",
          (e as any)?.response?.status ?? (e as any)?.message ?? String(e)
        )
      )
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [id]);

  const images = useMemo<string[]>(
    () => (data?.imageUrl ? [data.imageUrl] : []),
    [data?.imageUrl]
  );

  const onToggleFavorite = async () => {
    if (!data || toggling) return;
    setToggling(true);
    const prev = data; // оптимістичний апдейт
    setData({ ...prev, favorite: !prev.favorite });
    try {
      const updated = await toggleProductFavorite(prev);
      setData(updated);
    } catch (e) {
      console.warn(
        "toggleFavorite failed:",
        (e as any)?.response?.status ?? (e as any)?.message ?? String(e)
      );
      setData(prev); // відкат
    } finally {
      setToggling(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={s.root}>
      {/* hero + close on top-right of image */}
      <View style={s.hero}>
        {/* close */}
        <View style={s.closeWrap}>
          <IconButton
            accessibilityLabel="Close"
            icon="close"
            variant="solid"
            onPress={() => router.back()}
          />
        </View>

        {loading ? (
          <View style={s.placeholder}>
            <ActivityIndicator />
          </View>
        ) : images.length ? (
          <>
            <ScrollView
              ref={scRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                const w = e.nativeEvent.layoutMeasurement.width;
                setPage(Math.round(x / w));
              }}
              scrollEventThrottle={16}
            >
              {images.map((uri, i) => (
                <Image
                  key={i}
                  source={{ uri }}
                  resizeMode="cover"
                  style={{ width: screenW, height: GALLERY_HEIGHT }}
                />
              ))}
            </ScrollView>

            {/* dots */}
            <View style={s.dots}>
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    s.dot,
                    {
                      backgroundColor:
                        i === page
                          ? p.highlight.medium
                          : p.neutral.light.medium,
                      opacity: i === page ? 1 : 0.6,
                    },
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={s.placeholder}>
            <IconButton
              icon="image"
              variant="ghost"
              disabled
              onPress={() => {}}
            />
          </View>
        )}
      </View>

      {/* details panel (no rounded corners) */}
      <View style={[s.panel, { paddingBottom: spacing.xl + insets.bottom }]}>
        {/* title + heart on the right */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.md,
            marginBottom: spacing.xs,
          }}
        >
          <Text style={[s.title, { flex: 1 }]} numberOfLines={2}>
            {data?.title ?? " "}
          </Text>

          <IconButton
            accessibilityLabel={
              data?.favorite ? "Remove from favorites" : "Add to favorites"
            }
            icon={data?.favorite ? "heart" : "heart-outline"}
            variant="ghost"
            onPress={onToggleFavorite}
            disabled={toggling || loading || !data}
          />
        </View>

        <Text style={s.price}>
          {typeof data?.price === "number" ? `$ ${data.price.toFixed(2)}` : ""}
        </Text>

        {/* metrics */}
        <View style={{ gap: spacing.sm, flexGrow: 1 }}>
          <Text style={s.metricsTitle}>Pattern size in stitches:</Text>
          <Text style={s.metric}>- horizontally {data?.width ?? "—"}</Text>
          <Text style={[s.metric, { marginBottom: spacing.md }]}>
            - vertically {data?.height ?? "—"}
          </Text>

          <Text style={[s.metricsTitle, { marginBottom: spacing.xs }]}>
            Number of colors is {data?.colors ?? "—"}, of which:
          </Text>
          <Text style={s.metric}>
            - solids (clear colors) {data?.solids ?? "—"}
          </Text>
          <Text style={s.metric}>
            - blends (mixed colors) {data?.blends ?? "—"}
          </Text>
        </View>

        {/* CTA pinned to bottom */}
        <View style={{ marginTop: "auto" }}>
          <PrimaryButton
            title="+ Add to cart"
            onPress={() => {
              // TODO: addToCart(data?.id)
            }}
            fullWidth
            size="lg"
            variant="solid"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
