import { useWorkout } from "~/context/workout-context";
import { Button } from "../ui/button";
import { Play, X } from "lucide-react";
import { useNavigate } from "react-router";

export function WorkoutBanner() {
  const { currentWorkout } = useWorkout();
  const navigate = useNavigate();

  if (!currentWorkout) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-primary p-2 flex justify-between items-center">
      <div className="text-primary-foreground">
        <div className="text-sm font-medium">Active Workout</div>
        <div className="text-xs opacity-90">
          Started {new Date(currentWorkout.startedAt).toLocaleTimeString()}
        </div>
      </div>
      <Button 
        variant="secondary" 
        size="sm"
        onClick={() => navigate('/workout')}
      >
        <Play className="w-4 h-4 mr-1" />
        Resume
      </Button>
    </div>
  );
} 