import Programs from "~/components/programs/programs";
import type { Route } from "./+types/workout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Programs" },
    { name: "description", content: "Programs" },
  ];
}

export default function ProgramsPage() {
  return <Programs />;
}