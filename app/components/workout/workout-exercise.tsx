import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetTrigger } from "~/components/ui/sheet";
import { WorkoutSetForm } from "~/components/workout/workout-set-form";
import WorkoutSetTable from "~/components/workout/workout-set-table";
import { useWorkout } from "~/context/workout-context";
import { useState } from "react";
import { AppHeader } from "../layout/app-header";

export default function WorkoutExercise({ id }: { id: string }) {
  const { workoutExercises } = useWorkout();
  const [open, setOpen] = useState(false);
  const exercise = workoutExercises.find(e => e.exerciseId === parseInt(id));

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return (
    <div>
      <AppHeader title="Workout" variant="subpage" />
      <div className="container py-4">
        <div className='px-4 space-y-3'>
          <h2 className='text-2xl font-semibold tracking-tight'>{exercise.exerciseName}</h2>
          {exercise.sets.length > 0 ? (
            <WorkoutSetTable exerciseId={exercise.exerciseId} sets={exercise.sets} isBodyweight={exercise.isBodyweight} />
          ) : (
            <p className='text-muted-foreground'>Start by adding a set</p>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className={'w-full'}>
                <Plus /> ADD SET
              </Button>
            </SheetTrigger>
            <WorkoutSetForm
              exerciseId={exercise.exerciseId}
              isBodyweight={exercise.isBodyweight}
              onOpenChange={setOpen}
            />
          </Sheet>
        </div>
      </div>
    </div>
  )
}