import { useWorkout } from "~/context/workout-context";
import { AppHeader } from "../layout/app-header";
import WorkoutExerciseList from "./workout-exercise-list";
import { ContentHeader } from "../layout/content-header";

export default function Workout() {
  const { workoutExercises, currentWorkout } = useWorkout();

  if (!currentWorkout) {
    return <div>No active workout.</div>;
  }

  return (
    <div>
      <AppHeader title="Workout" />
      <div className="container pb-4">
        <ContentHeader title={currentWorkout.workoutName} description={currentWorkout.workoutDescription} />
        <WorkoutExerciseList 
          workoutExercises={workoutExercises} 
          currentWorkout={currentWorkout} 
        />
      </div>
    </div>
  );
} 