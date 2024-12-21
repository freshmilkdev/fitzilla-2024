import { Home } from "~/components/home";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fitzilla" },
    { name: "description", content: "Welcome to Fitzilla!" },
  ];
}

export default function HomePage() {
  return <Home />;
}