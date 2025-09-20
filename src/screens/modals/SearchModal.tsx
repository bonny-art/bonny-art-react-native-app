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
  StyleSheet,
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
import { palette } from "@shared/lib/palette";
import { spacing, typography } from "@/shared/lib/tokens";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import { IconButton } from "@/shared/ui/IconButton";
import { Text } from "@shared/ui/Text";

const RECENT_SEARCHES_STORAGE_KEY = "search:recent";
const MAX_RECENT = 10;

const normalizeParam = (param?: string | string[]): string => {
  if (Array.isArray(param)) return param[0] ?? "";
  return param ?? "";
};

const makeStyles = (scheme: keyof typeof palette) => {
  const p = palette[scheme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: p.neutral.dark.darkest,
    },
    container: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
    },
    searchWrapper: {
      height: 40,
      borderRadius: 20,
      backgroundColor: p.neutral.dark.dark,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    searchIconButton: {
      paddingVertical: 4,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: 8,
      color: p.neutral.light.lightest,
      fontFamily: typography.body.m.fontFamily,
      fontSize: typography.body.m.fontSize,
      lineHeight: typography.body.m.lineHeight,
    },
    clearButton: {
      padding: 4,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.xl,
    },
    headerTitle: {
      marginLeft: spacing.sm,
      color: p.neutral.light.lightest,
      fontFamily: typography.body.l.fontFamily,
      fontSize: typography.body.l.fontSize,
      lineHeight: typography.body.l.lineHeight,
    },
    recentList: {
      marginTop: spacing.lg,
    },
    recentRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.sm,
    },
    recentButton: {
      flex: 1,
      marginRight: spacing.sm,
    },
    recentText: {
      color: p.neutral.light.lightest,
      fontFamily: typography.body.m.fontFamily,
      fontSize: typography.body.m.fontSize,
      lineHeight: typography.body.m.lineHeight,
    },
    emptyText: {
      color: p.neutral.light.dark,
      opacity: 0.7,
      marginTop: spacing.md,
    },
  });
};

export default function SearchModal() {
  const { categoryId: categoryParam, query: queryParam } =
    useLocalSearchParams<{
      categoryId?: string | string[];
      query?: string | string[];
    }>();

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
  const p = palette[scheme];

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
    }, 150);
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
            accessibilityLabel="Apply search"
            style={styles.searchIconButton}
            activeOpacity={0.8}
          >
            <IconSymbol
              name="search"
              size={20}
              color={p.neutral.light.lightest}
            />
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={setValue}
            placeholder="Search"
            placeholderTextColor={p.neutral.light.dark}
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
              accessibilityLabel="Clear search"
              style={styles.clearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <IconSymbol
                name="close"
                size={18}
                color={p.neutral.light.light}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.headerRow}>
          <IconButton
            icon="chevron-left"
            variant="ghost"
            onPress={handleBack}
            accessibilityLabel="Go back"
          />
          <Text style={styles.headerTitle}>Recent searches</Text>
        </View>

        <View style={styles.recentList}>
          {recent.length === 0 ? (
            <Text style={styles.emptyText}>There is no history yet.</Text>
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
                  accessibilityLabel={`Remove ${term} from history`}
                />
              </View>
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
