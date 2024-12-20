import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useWorkout } from "~/context/workout-context";
import { cn } from "~/lib/utils";

interface FabProps {
    onClick?: () => void;
    className?: string;
}

export function Fab({ onClick, className = '' }: FabProps) {
    const { currentWorkout } = useWorkout();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Button
            className={cn(`fixed mx-auto left-1/2 transform -translate-x-1/2 rounded-full h-14 w-14`, 
                className,
                currentWorkout ? 'bottom-32' : 'bottom-20'
            )}
            onClick={handleClick}
        >
            <Plus className="!h-8 !w-8" />
        </Button>
    );
} 