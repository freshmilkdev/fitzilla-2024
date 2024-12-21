import * as React from "react";
import { db } from "~/db";
import type { UserSettings } from "~/types";

interface SettingsContextType {
  settings: UserSettings | null;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
}

export const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = React.useState<UserSettings | null>(null);

  const loadSettings = async () => {
    const savedSettings = await db.settings.get(1); // Assuming a single settings entry
    setSettings(savedSettings || null);
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (settings) {
      const updatedSettings = { ...settings, ...newSettings };
      await db.settings.put({ id: 1, ...updatedSettings }); // Update settings
      setSettings(updatedSettings);
    } else {
      const newSettingsEntry: UserSettings = {
        theme: "system",
        colorScheme: "#ffffff", // Default color scheme
        measurementUnit: "kg", // Default measurement unit
        ...newSettings,
      };
      await db.settings.add(newSettingsEntry); // Add new settings
      setSettings(newSettingsEntry);
    }
  };

  React.useEffect(() => {
    loadSettings();
  }, []);

  const value = {
    settings,
    loadSettings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}; 