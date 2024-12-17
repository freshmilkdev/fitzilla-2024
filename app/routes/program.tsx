import type { Route } from "./+types/program";
import Program from "~/components/programs/program";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Program" },
    { name: "description", content: "Program Details" },
  ];
}

export default function ProgramPage({
  params,
}: Route.ComponentProps) {
  return <Program id={params.id} />;
} 