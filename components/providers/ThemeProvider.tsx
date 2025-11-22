/**
 * Theme Provider
 * Centralized theme management using React Context
 * Handles theme state, persistence, and system preference detection
 */

"use client";

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  ReactNode 
} from 'react';
import { ThemeConfig, ThemeMode } from '@/types/theme';
import { THEME_PRESETS, DEFAULT_THEME } from '@/lib/theme/presets';
import { 
  applyTheme, 
  getSystemTheme, 
  watchSystemTheme,
  getLocalStorage,
  setLocalStorage
} from '@/lib/theme/utils';

/**
 * Theme context value interface
 */
interface ThemeContextValue {
  /** Current active theme configuration */
  currentTheme: ThemeConfig;
  
  /** Current theme mode setting */
  themeMode: ThemeMode;
  
  /** Set theme by ID */
  setTheme: (themeId: string) => void;
  
  /** Set theme mode */
  setThemeMode: (mode: ThemeMode) => void;
  
  /** Register a custom theme */
  registerTheme: (theme: ThemeConfig) => void;
  
  /** Unregister a custom theme */
  unregisterTheme: (themeId: string) => void;
  
  /** All available themes (built-in + custom) */
  availableThemes: ThemeConfig[];
  
  /** Whether current resolved theme is dark */
  isDark: boolean;
  
  /** Actual theme applied ('light' or 'dark' after auto resolution) */
  resolvedTheme: 'light' | 'dark';
  
  /** Whether the provider is mounted (for SSR compatibility) */
  isMounted: boolean;
}

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Storage keys for persistence
 */
const STORAGE_KEY = 'copilot-chan-theme';
const MODE_STORAGE_KEY = 'copilot-chan-theme-mode';

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  children: ReactNode;
  /** Default theme ID (optional, defaults to 'light') */
  defaultTheme?: string;
  /** Default theme mode (optional, defaults to 'auto') */
  defaultMode?: ThemeMode;
}

/**
 * Theme Provider Component
 * Wrap your app with this to enable theme management
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = DEFAULT_THEME,
  defaultMode = 'auto'
}: ThemeProviderProps) {
  // SSR-safe mounted state
  const [isMounted, setIsMounted] = useState(false);
  
  // Theme state
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);
  const [currentThemeId, setCurrentThemeId] = useState<string>(defaultTheme);
  const [customThemes, setCustomThemes] = useState<ThemeConfig[]>([]);
  
  // Initialize from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    
    // Load saved preferences
    const savedMode = getLocalStorage(MODE_STORAGE_KEY) as ThemeMode;
    const savedThemeId = getLocalStorage(STORAGE_KEY);
    
    if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
      setThemeModeState(savedMode);
    }
    
    if (savedThemeId) {
      setCurrentThemeId(savedThemeId);
    }
  }, []);
  
  // Compute available themes (built-in + custom)
  const availableThemes = [...Object.values(THEME_PRESETS), ...customThemes];
  
  // Get current theme config
  const currentTheme = availableThemes.find(t => t.id === currentThemeId) 
    || THEME_PRESETS[defaultTheme] 
    || THEME_PRESETS[DEFAULT_THEME];
  
  // Resolve actual theme based on mode
  const resolvedTheme: 'light' | 'dark' = 
    themeMode === 'auto' 
      ? getSystemTheme()
      : themeMode === 'dark' 
        ? 'dark' 
        : 'light';
  
  const isDark = resolvedTheme === 'dark';
  
  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (!isMounted) return;
    
    applyTheme(currentTheme, resolvedTheme);
  }, [isMounted, currentTheme, resolvedTheme]);
  
  // Watch for system theme changes when in auto mode
  useEffect(() => {
    if (!isMounted || themeMode !== 'auto') return;
    
    const cleanup = watchSystemTheme((systemTheme) => {
      // Theme will auto-update via resolvedTheme dependency
      // This triggers a re-render which updates resolvedTheme
      // Force update by using a state setter
      setThemeModeState('auto'); // This triggers re-render
    });
    
    return cleanup;
  }, [isMounted, themeMode]);
  
  // Theme setter with persistence
  const setTheme = useCallback((themeId: string) => {
    const themeExists = availableThemes.some(t => t.id === themeId);
    if (!themeExists) {
      console.warn(`Theme "${themeId}" not found. Available themes:`, availableThemes.map(t => t.id));
      return;
    }
    
    setCurrentThemeId(themeId);
    setLocalStorage(STORAGE_KEY, themeId);
  }, [availableThemes]);
  
  // Theme mode setter with persistence
  const setThemeMode = useCallback((mode: ThemeMode) => {
    if (!['light', 'dark', 'auto'].includes(mode)) {
      console.warn(`Invalid theme mode: ${mode}`);
      return;
    }
    
    setThemeModeState(mode);
    setLocalStorage(MODE_STORAGE_KEY, mode);
  }, []);
  
  // Register custom theme
  const registerTheme = useCallback((theme: ThemeConfig) => {
    if (!theme.id || !theme.name || !theme.colors) {
      console.warn('Invalid theme configuration:', theme);
      return;
    }
    
    setCustomThemes(prev => {
      // Check if theme already exists
      const existingIndex = prev.findIndex(t => t.id === theme.id);
      
      if (existingIndex >= 0) {
        // Update existing theme
        const updated = [...prev];
        updated[existingIndex] = theme;
        return updated;
      }
      
      // Add new theme
      return [...prev, theme];
    });
  }, []);
  
  // Unregister custom theme
  const unregisterTheme = useCallback((themeId: string) => {
    // Prevent unregistering built-in themes
    if (themeId in THEME_PRESETS) {
      console.warn(`Cannot unregister built-in theme: ${themeId}`);
      return;
    }
    
    setCustomThemes(prev => prev.filter(t => t.id !== themeId));
    
    // If current theme is being removed, switch to default
    if (currentThemeId === themeId) {
      setTheme(defaultTheme);
    }
  }, [currentThemeId, defaultTheme, setTheme]);
  
  // Provide context value
  const value: ThemeContextValue = {
    currentTheme,
    themeMode,
    setTheme,
    setThemeMode,
    registerTheme,
    unregisterTheme,
    availableThemes,
    isDark,
    resolvedTheme,
    isMounted,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 * Access theme context in any component
 * 
 * @throws Error if used outside ThemeProvider
 * @returns Theme context value
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * useThemeColors Hook
 * Convenience hook to access just the theme colors
 * 
 * @returns Current theme colors
 */
export function useThemeColors() {
  const { currentTheme } = useTheme();
  return currentTheme.colors;
}

/**
 * useIsDark Hook
 * Convenience hook to check if current theme is dark
 * 
 * @returns Whether current theme is dark
 */
export function useIsDark(): boolean {
  const { isDark } = useTheme();
  return isDark;
}
