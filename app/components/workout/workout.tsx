import { useWorkout } from "~/context/workout-context";
import { AppHeader } from "../layout/app-header";
import WorkoutExerciseList from "./workout-exercise-list";
import { ContentHeader } from "../layout/content-header";
import { Trash2, Check, Ban } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { routePaths } from "~/routes";
import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";
import type { ExtendedWorkoutExercise } from "~/types";

export default function Workout() {
  const { workoutExercises, currentWorkout, deleteWorkout, completeWorkout, isLoaded } = useWorkout();
  const navigate = useNavigate();

  // Fetch all exercises once
  const extendedWorkoutExercises = useLiveQuery(async () => {
    if (!currentWorkout) return [];

    // Fetch all exercises related to the current workout
    const exercises = await db.exercises.toArray(); // Fetch all exercises at once
    const workoutExercisesWithDetails = await Promise.all(
      workoutExercises.map(async (exercise) => {
        const exerciseDetails = exercises.find(e => e.id === exercise.exerciseId); // Find the exercise by ID
        return {
          ...exercise,
          exerciseName: exerciseDetails?.name || '',
          description: exerciseDetails?.description || '',
          isBodyweight: exerciseDetails?.isBodyweight || false,
        } as ExtendedWorkoutExercise;
      })
    );

    return workoutExercisesWithDetails;
  }, [currentWorkout, workoutExercises]);

  useEffect(() => {
    if (isLoaded && !currentWorkout) {
      navigate(routePaths.history);
    }
  }, [isLoaded, currentWorkout, navigate]);

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
            deleteWorkout();
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
          workoutExercises={extendedWorkoutExercises || []} // Pass the fetched exercises
          currentWorkout={currentWorkout}
        />
      </div>
    </div>
  );
} 