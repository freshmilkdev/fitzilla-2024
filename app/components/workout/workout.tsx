import { useWorkout } from "~/context/workout-context";
import { AppHeader } from "../layout/app-header";
import WorkoutExerciseList from "./workout-exercise-list";
import { ContentHeader } from "../layout/content-header";
import { Trash2, Check, Ban } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { routePaths } from "~/routes";
import { useEffect } from "react";

export default function Workout() {
  const { workoutExercises, currentWorkout, abandonWorkout, completeWorkout } = useWorkout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentWorkout) {
      navigate(routePaths.history);
    }
  }, [currentWorkout, navigate]); // Add dependency array

  if (!currentWorkout) {
    return <div>No active workout.</div>;
  }

  return (
    <div>
      <AppHeader title="Workout" />
      <div className="container pb-4">
        <ContentHeader title={currentWorkout.workoutName} description={currentWorkout.workoutDescription} />
        <div className="px-2 py-4 flex space-x-4 justify-center items-center">
          <Button variant="destructive" onClick={() => {
            abandonWorkout();
            navigate(routePaths.history);
          }}
            className="flex-1">
            <Ban className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={() => {
            completeWorkout();
            navigate(routePaths.history);
          }}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
            <Check className="h-4 w-4" />
            Complete
          </Button>
        </div>
        <WorkoutExerciseList
          workoutExercises={workoutExercises}
          currentWorkout={currentWorkout}
        />
      </div>
    </div>
  );
} 