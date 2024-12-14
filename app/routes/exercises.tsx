import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Exercises" },
    { name: "description", content: "Exercises" },
  ];
}
export default function Exercises() {
  return <h1>Exercises Page</h1>;
}