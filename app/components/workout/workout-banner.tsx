import { useWorkout } from "~/context/workout-context";
import { Button } from "../ui/button";
import { Play, X } from "lucide-react";
import { useNavigate } from "react-router";

export function WorkoutBanner() {
  const { currentWorkout } = useWorkout();
  const navigate = useNavigate();

  if (!currentWorkout) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-background rounded-lg mx-0.5 border border-gray-200 px-2 py-1 flex justify-between items-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute inline-flex animate-ping rounded-full bg-green-400 opacity-75 h-3 w-3" />
        <div className="relative inline-flex rounded-full bg-green-500 h-3 w-3" />
      </div>

      <div className="text-foreground">
        <div className="text-sm font-medium">Active Workout</div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/workout')}
      >
        <Play className="w-4 h-4 mr-1" />
      </Button>
    </div>
  );
} 