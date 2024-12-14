import type {Route} from "./+types/exercises";
import {MuscleGroupList} from "~/components/exercises/muscle-group-list";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Exercises"},
    {name: "description", content: "Exercises"},
  ];
}

export default function Exercises() {
  return <MuscleGroupList/>;
}