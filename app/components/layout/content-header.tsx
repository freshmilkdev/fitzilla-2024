import { Separator } from "../ui/separator";

interface ContentHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function ContentHeader({ title = "Workout", description, children }: ContentHeaderProps) {
  return (
    <>
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">{title}</h2>
          {description && (
            <div className="text-muted-foreground text-sm">
              {description}
            </div>
          )}
        </div>
        {children}
      </div>
      <Separator />
    </>
  );
} 