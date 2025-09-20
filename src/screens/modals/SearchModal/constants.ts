import { sizes } from "@/shared/lib/tokens";

export const RECENT_SEARCHES_STORAGE_KEY = "search:recent";
export const MAX_RECENT = 10;
export const FOCUS_DELAY_MS = 150;

export const APPLY_SEARCH_LABEL = "Apply search";
export const CLEAR_SEARCH_LABEL = "Clear search";
export const GO_BACK_LABEL = "Go back";
export const getRemoveRecentLabel = (term: string) =>
  `Remove ${term} from history`;

export const RECENT_SECTION_TITLE = "Recent searches";
export const RECENT_EMPTY_MESSAGE = "There is no history yet.";
export const SEARCH_PLACEHOLDER = "Search";

export const SEARCH_BAR_HEIGHT = sizes.searchBar.height;
export const SEARCH_BAR_RADIUS = sizes.searchBar.radius;
export const SEARCH_BAR_PADDING_HORIZONTAL = sizes.searchBar.paddingHorizontal;
export const SEARCH_ICON_SIZE = sizes.searchBar.icon;
export const CLEAR_ICON_SIZE = sizes.searchBar.clearIcon;
