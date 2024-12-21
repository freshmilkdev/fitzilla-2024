import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "../../context/theme-context";
import { Switch } from "./switch";
import { Label } from "./label";
export function ModeToggle() {
    const { settings, updateSettings } = useTheme();

    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center">
                <Label htmlFor="theme-toggle">
                    <Sun className="h-4 w-4" /></Label>
                <Switch id="theme-toggle"
                    className="mx-1"
                    checked={settings?.theme === 'dark'} 
                    onCheckedChange={() => updateSettings({ theme: settings?.theme === 'dark' ? 'light' : 'dark' })} />
                <Label htmlFor="theme-toggle">
                    <Moon className="h-4 w-4" /></Label>
            </div>

        </div>
    );
} 