import type {Route} from "./+types/workout";

import WorkoutExerciseList from "~/components/workout/workout-exercise-list";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Workout"},
    {name: "description", content: "Workout"},
  ];
}

export default function WorkoutPage() {
  return <WorkoutExerciseList/>;
}