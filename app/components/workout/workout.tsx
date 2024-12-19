import { AppHeader } from "../layout/app-header";
import WorkoutExerciseList from "./workout-exercise-list";

export default function Workout() {
  return (
    <div>
      <AppHeader title="Workout" />
      <WorkoutExerciseList/>    
    </div>
  )
}