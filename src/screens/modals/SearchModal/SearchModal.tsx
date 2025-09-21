import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  type TextInput as TextInputType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store";
import { clearCategorySearch, setCategorySearch } from "@/store/searchSlice";
import { useTheme } from "@/providers/theme/ThemeContext";
import { palette } from "@/shared/lib/palette";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { IconButton } from "@/shared/ui/IconButton";
import { Text } from "@/shared/ui/Text";
import { spacing } from "@/shared/lib/tokens";

import {
  APPLY_SEARCH_LABEL,
  CLEAR_ICON_SIZE,
  CLEAR_SEARCH_LABEL,
  FOCUS_DELAY_MS,
  GO_BACK_LABEL,
  MAX_RECENT,
  RECENT_EMPTY_MESSAGE,
  RECENT_SEARCHES_STORAGE_KEY,
  RECENT_SECTION_TITLE,
  SEARCH_ICON_SIZE,
  SEARCH_PLACEHOLDER,
  getRemoveRecentLabel,
} from "./constants";
import { makeStyles } from "./styles";
import type { CategorySearchParams } from "./types";

const normalizeParam = (param?: string | string[]): string => {
  if (Array.isArray(param)) return param[0] ?? "";
  return param ?? "";
};

/**
 * Modal that manages category-specific search queries with recent history.
 */
export default function SearchModal() {
  const { categoryId: categoryParam, query: queryParam } =
    useLocalSearchParams<CategorySearchParams>();

  const categoryId = useMemo(
    () => normalizeParam(categoryParam),
    [categoryParam]
  );
  const initialQuery = useMemo(() => normalizeParam(queryParam), [queryParam]);

  const [value, setValue] = useState(initialQuery);
  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<TextInputType>(null);

  const { currentTheme: scheme } = useTheme();
  const styles = useMemo(() => makeStyles(scheme), [scheme]);
  const colors = palette[scheme];

  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
        if (!mounted) return;
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            const normalized = parsed
              .map((item) => (typeof item === "string" ? item : ""))
              .filter((item) => item.trim().length > 0)
              .slice(0, MAX_RECENT);
            setRecent(normalized);
          }
        }
      } catch (err) {
        console.warn("Failed to load recent searches", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, FOCUS_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const persistRecent = useCallback(async (entries: string[]) => {
    try {
      if (entries.length === 0) {
        await AsyncStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY);
      } else {
        await AsyncStorage.setItem(
          RECENT_SEARCHES_STORAGE_KEY,
          JSON.stringify(entries)
        );
      }
    } catch (err) {
      console.warn("Failed to save recent searches", err);
    }
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSelectRecent = useCallback((term: string) => {
    setValue(term);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const handleRemoveRecent = useCallback(
    (term: string) => {
      setRecent((prev) => {
        const next = prev.filter((item) => item !== term);
        void persistRecent(next);
        return next;
      });
    },
    [persistRecent]
  );

  const handleClearInput = useCallback(() => {
    setValue("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  const applySearch = useCallback(() => {
    const trimmed = value.trim();

    if (categoryId) {
      if (trimmed.length > 0) {
        dispatch(setCategorySearch({ categoryId, query: trimmed }));
      } else {
        dispatch(clearCategorySearch(categoryId));
      }
    }

    if (trimmed.length > 0) {
      setRecent((prev) => {
        const lowered = trimmed.toLowerCase();
        const withoutDupes = prev.filter(
          (item) => item.toLowerCase() !== lowered
        );
        const next = [trimmed, ...withoutDupes].slice(0, MAX_RECENT);
        void persistRecent(next);
        return next;
      });
    }

    router.back();
  }, [categoryId, dispatch, persistRecent, value]);

  const handleSubmitEditing = useCallback(() => {
    applySearch();
  }, [applySearch]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            onPress={applySearch}
            accessibilityLabel={APPLY_SEARCH_LABEL}
            style={styles.searchIconButton}
            activeOpacity={0.8}
          >
            <IconSymbol
              name="search"
              size={SEARCH_ICON_SIZE}
              color={colors.neutral.light.lightest}
            />
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={setValue}
            placeholder={SEARCH_PLACEHOLDER}
            placeholderTextColor={colors.neutral.light.dark}
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSubmitEditing}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardAppearance={scheme === "dark" ? "dark" : "light"}
          />

          {value.length > 0 ? (
            <TouchableOpacity
              onPress={handleClearInput}
              accessibilityLabel={CLEAR_SEARCH_LABEL}
              style={styles.clearButton}
              hitSlop={{
                top: spacing.sm,
                bottom: spacing.sm,
                left: spacing.sm,
                right: spacing.sm,
              }}
            >
              <IconSymbol
                name="close"
                size={CLEAR_ICON_SIZE}
                color={colors.neutral.light.light}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.headerRow}>
          <IconButton
            icon="chevron-left"
            variant="ghost"
            onPress={handleBack}
            accessibilityLabel={GO_BACK_LABEL}
          />
          <Text style={styles.headerTitle}>{RECENT_SECTION_TITLE}</Text>
        </View>

        <View style={styles.recentList}>
          {recent.length === 0 ? (
            <Text style={styles.emptyText}>{RECENT_EMPTY_MESSAGE}</Text>
          ) : (
            recent.map((term) => (
              <View key={term} style={styles.recentRow}>
                <TouchableOpacity
                  style={styles.recentButton}
                  onPress={() => handleSelectRecent(term)}
                  accessibilityRole="button"
                  activeOpacity={0.8}
                >
                  <Text style={styles.recentText} numberOfLines={1}>
                    {term}
                  </Text>
                </TouchableOpacity>
                <IconButton
                  icon="close"
                  variant="ghost"
                  size="sm"
                  onPress={() => handleRemoveRecent(term)}
                  accessibilityLabel={getRemoveRecentLabel(term)}
                />
              </View>
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
