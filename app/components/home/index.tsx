import { Settings } from "lucide-react";
import { AppHeader } from "../layout/app-header";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Toggle } from "../ui/toggle";
import { useTheme } from "../../context/theme-context";
import { Separator } from "../ui/separator";
import { Sun, Moon } from "lucide-react";

export function Home() {
    const { settings, updateSettings } = useTheme();

    const handleThemeChange = (newTheme: "dark" | "light" | "system") => {
        updateSettings({ theme: newTheme });
    };

    const handleMeasurementUnitChange = (newUnit: "kg" | "lbs") => {
        updateSettings({ measurementUnit: newUnit });
    };

    return (
        <div>
            <AppHeader title="Home" rightElement={
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="!h-6 !w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                            <SheetTitle>Settings</SheetTitle>
                        </SheetHeader>
                        <div className="pt-4 space-y-2 pb-10">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between w-full">
                                    <p className="font-medium">Theme</p>
                                    <Toggle
                                        id="theme-toggle-light"
                                    checked={settings?.theme === "dark"}
                                    onCheckedChange={() => handleThemeChange(settings?.theme === "light" ? "dark" : "light")}
                                    iconOn={<Sun className="h-4 w-4" />}
                                    iconOff={<Moon className="h-4 w-4" />}
                                />  
                                </div>
                                <div className="flex items-center justify-between w-full">
                                <p className="font-medium">Units</p>
                                <Toggle
                                    id="theme-toggle-system"
                                    checked={settings?.measurementUnit === "kg"}
                                    onCheckedChange={() => handleMeasurementUnitChange(settings?.measurementUnit === "kg" ? "lbs" : "kg")}
                                    iconOff={<span className="text-sm">kg</span>}
                                    iconOn={<span className="text-sm">lbs</span>}
                                />
                                </div>
                            </div>
                            <Separator />
                        </div>
                    </SheetContent>
                </Sheet>
            } />
        </div>
    );
}