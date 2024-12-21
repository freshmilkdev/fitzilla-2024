import { createContext, useContext, useEffect, useState } from "react";
import { db } from "~/db";
import type { UserSettings } from "~/types";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  settings: UserSettings | null;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
};

const initialState: ThemeProviderState = {
  settings: null,
  loadSettings: async () => {},
  updateSettings: async () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [settings, setSettings] = useState<UserSettings | null>(null);

  const loadSettings = async () => {
    const savedSettings = await db.settings.get(1);
    setSettings(savedSettings || null);
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (settings) {
      const updatedSettings = { ...settings, ...newSettings };
      await db.settings.put({ id: 1, ...updatedSettings });
      setSettings(updatedSettings);
    } else {
      const newSettingsEntry: UserSettings = {
        theme: "system",
        colorScheme: "#ffffff",
        measurementUnit: "kg",
        ...newSettings,
      };
      await db.settings.add(newSettingsEntry);
      setSettings(newSettingsEntry);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (settings.theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

        root.classList.add(systemTheme);
      } else {
        root.classList.add(settings.theme);
      }
    }
  }, [settings]);

  const value = {
    settings,
    loadSettings,
    updateSettings,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 