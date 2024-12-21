import { Settings } from "lucide-react";
import { AppHeader } from "../layout/app-header";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ModeToggle } from "../ui/mode-toggle";
import { Separator } from "../ui/separator";

export function Home() {
    return (
        <div>
            <AppHeader title="Home" rightElement={
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                            <SheetTitle>Settings</SheetTitle>
                            <SheetDescription />
                        </SheetHeader>
                        <div className="pt-4 space-y-2 pb-10">
                            <div className="flex items-center justify-between">
                                <p className="font-medium">Theme</p>
                                <ModeToggle />
                            </div>
                            <Separator />
                        </div>
                    </SheetContent>
                </Sheet>
            } />
        </div>
    );
}