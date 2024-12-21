import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";

interface AppHeaderProps {
  title: string;
  variant?: 'root' | 'subpage';  // Add variant to distinguish screen types
  rightElement?: React.ReactNode;
}

export function AppHeader({ title, variant = 'root', rightElement }: AppHeaderProps) {
  return (
    <header className="px-4 sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center gap-2">
          {variant === 'subpage' && (
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className={cn(
            "flex-1 font-semibold text-xl text-center",
            variant === 'subpage' 
              ? "text-xl absolute left-1/2 -translate-x-1/2" 
              : ""
          )}>
            {title}
          </h1>
        </div>
        {rightElement && (
          <div className="flex-none">
            {rightElement}
          </div>
        )}
      </div>
    </header>
  );
}