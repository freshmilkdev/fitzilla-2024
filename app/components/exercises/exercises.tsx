import { MuscleGroupList } from "~/components/exercises/muscle-group-list";
import { ExerciseForm } from "~/components/exercises/exercise-form";
import { Sheet, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { ExerciseSheetProvider, useExerciseSheet } from "../../context/exercise-sheet-context";
import { PageHeader } from "../layout/page-header";
import { AppHeader } from "../layout/app-header";
import { DialogProvider } from "~/context/dialog-context";
import { useGroupedExercises } from "~/hooks/use-grouped-exercises";
import { Fab } from "../ui/fab";

function ExercisesContent() {
  const { isOpen, setIsOpen, setExercise } = useExerciseSheet();
  const groupedExercises = useGroupedExercises();

  const handleAddExercise = () => {
    setExercise(null);
    setIsOpen(true);
  };

  if (!groupedExercises) {
    return <div>Loading exercises...</div>;
  }

  return (
    <>
      <AppHeader title="Exercises" />
      <div className="container pt-4 pb-20">
        <MuscleGroupList groupedExercises={groupedExercises} variant="withOptions" />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <Fab onClick={handleAddExercise} />
          <ExerciseForm />
        </Sheet>
      </div>
    </>
  );
}

export default function Exercises() {
  return (
    <ExerciseSheetProvider>
      <DialogProvider>
        <ExercisesContent />
      </DialogProvider>
    </ExerciseSheetProvider>
  )
}
