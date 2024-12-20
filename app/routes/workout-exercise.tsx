import { AppHeader } from "~/components/layout/app-header";
import type { Route } from "./+types/workout-exercise";
import WorkoutExercise from "~/components/workout/workout-exercise";

// export async function loader({params}: Route.LoaderArgs) {
//   const {id} = params;
// }

export default function WorkoutExercisePage({
  params,
}: Route.ComponentProps) {
  return (
    <div>
      <AppHeader title="Workout" variant="subpage"/>
      <div className="container py-4">
        <WorkoutExercise id={params.exerciseId} />
      </div>
    </div>
  );
}