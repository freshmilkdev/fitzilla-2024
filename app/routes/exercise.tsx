import type {Route} from "./+types/exercise";
import WorkoutExercise from "~/components/workout/workout-exercise";

// export async function loader({params}: Route.LoaderArgs) {
//   const {id} = params;
// }

export default function Exercise({
                                   params,
                                 }: Route.ComponentProps) {
  return (
    <WorkoutExercise id={params.id}/>
  );
}