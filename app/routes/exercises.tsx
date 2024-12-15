import type {Route} from "./+types/exercises";
import Exercises from "~/components/exercises/Exercises";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Exercises"},
    {name: "description", content: "Exercises"},
  ];
}

export default function ExercisesPage() {
  return <Exercises/>;
}