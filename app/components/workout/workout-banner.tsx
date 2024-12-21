import { useWorkout } from "~/context/workout-context";
import { Button } from "../ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { routePaths } from "~/routes";

export function WorkoutBanner() {
  const { currentWorkout } = useWorkout();
  const location = useLocation();

  // Don't show banner if we're already in workout routes
  if (!currentWorkout || location.pathname.startsWith('/workout')) {
    return null;
  }

  return (
    <NavLink to={routePaths.workout}>
      <Button
        className="fixed bottom-[74px] left-0 right-0 rounded-lg mx-0.5 border border-gray-200 p-5 flex justify-between items-center">
        <div className="relative flex items-center justify-center">
        <div className="absolute inline-flex animate-ping rounded-full bg-green-400 opacity-75 h-3 w-3" />
        <div className="relative inline-flex rounded-full bg-green-500 h-3 w-3" />
      </div>

      <span className="text-sm font-medium">Active Workout</span>

      <SquareArrowOutUpRight className="!w-5 !h-5 mr-1" />

    </Button>
    </NavLink>
  );
} 