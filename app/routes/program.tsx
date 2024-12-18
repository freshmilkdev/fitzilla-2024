import { ProgramSheetProvider } from "~/context/program-sheet-context";
import type { Route } from "./+types/program";
import Program from "~/components/programs/program";
import { DialogProvider } from "~/context/dialog-context";
import { SelectedExercisesProvider } from "~/context/selected-exercises-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Program" },
    { name: "description", content: "Program Details" },
  ];
}

export default function ProgramPage({
  params,
}: Route.ComponentProps) {
  return (
    <ProgramSheetProvider>
      <SelectedExercisesProvider>
        <DialogProvider>
          <Program id={params.id ?? null} />
        </DialogProvider>
      </SelectedExercisesProvider>
    </ProgramSheetProvider>
  )
} 