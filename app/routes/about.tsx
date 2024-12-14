import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ABOUT" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function About() {
  return <h1>About Page</h1>;
}