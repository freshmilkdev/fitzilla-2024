import type {Route} from "./+types/about";
import {ExerciseList} from "~/components/exercises/exercise-list";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Exercises"},
    {name: "description", content: "Exercises"},
  ];
}

export default function Exercises() {
  return <ExerciseList/>;
}