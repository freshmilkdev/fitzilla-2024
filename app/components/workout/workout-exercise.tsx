import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetTrigger } from "~/components/ui/sheet";
import { WorkoutSetForm } from "~/components/workout/workout-set-form";
import WorkoutSetTable from "~/components/workout/workout-set-table";
import { useWorkout } from "~/context/workout-context";
import { useState } from "react";
import { AppHeader } from "../layout/app-header";
import { WorkoutSetSheetContent } from "~/components/workout/workout-set-form";
import { useWorkoutSetSheet } from "~/context/workout-set-sheet-context";
import { WorkoutSetSheetProvider } from "~/context/workout-set-sheet-context";
import { DialogProvider } from "~/context/dialog-context";
import { Fab } from "../ui/fab";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";

export function WorkoutExerciseContent({ id }: { id: string }) {
  const { workoutExercises } = useWorkout();
  const { isOpen, setIsOpen, setExerciseId, setSet, setSetIndex } = useWorkoutSetSheet();

  const exercise = workoutExercises.find(e => e.exerciseId === parseInt(id));

  const exerciseDetails = useLiveQuery(async () => {
    if (!exercise) return null;
    return db.exercises.get(exercise.exerciseId);
  }, [exercise]);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }
  
  const handleAddSet = () => {
    setExerciseId(exercise.exerciseId);
    setSet(null);
    setSetIndex(undefined);
    setIsOpen(true);
  };

  return (
    <div>
      <AppHeader title="Workout" variant="subpage" />
      <div className="container py-4">
        <div className='px-4 space-y-3'>
          <h2 className='text-xl font-semibold tracking-tight'>{exerciseDetails?.name}</h2>
          {exercise.sets.length > 0 ? (
            <WorkoutSetTable
              exerciseId={exercise.exerciseId}
              sets={exercise.sets}
              isBodyweight={exerciseDetails?.isBodyweight ?? false} />
          ) : (
            <p className='text-muted-foreground'>Start by adding a set</p>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <Fab onClick={handleAddSet} className="bottom-20" />
            <WorkoutSetSheetContent />
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutExercise({ id }: { id: string }) {
  return (
    <WorkoutSetSheetProvider>
      <DialogProvider>
        <WorkoutExerciseContent id={id} />
      </DialogProvider>
    </WorkoutSetSheetProvider>
  );
}