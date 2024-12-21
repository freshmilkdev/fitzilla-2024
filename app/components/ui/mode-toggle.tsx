import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "../theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center">
      <Button onClick={() => setTheme("light")}>
        <Sun className="h-4 w-4" />
      </Button>
      <Button onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
} 