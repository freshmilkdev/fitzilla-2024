import type {Route} from "./+types/workout";

import Workout from "~/components/workout/workout";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Workout"},
    {name: "description", content: "Workout"},
  ];
}

export default function WorkoutPage() {
  return <Workout/>;
}