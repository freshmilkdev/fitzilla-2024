import {Plus} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Sheet, SheetTrigger} from "~/components/ui/sheet";
import {WorkoutSetForm} from "~/components/workout/workout-set-form";
import WorkoutSetTable from "~/components/workout/workout-set-table";
import {useWorkout} from "~/context/workout-context";

export default function WorkoutExercise({id}: { id: string }) {
  const {workoutExercises} = useWorkout();
  const exercise = workoutExercises.find(e => e.exerciseId === Number(id));

  if (!exercise) {
    return <div>Exercise not found</div>;
  }
  
  return (
    <div className='px-4 space-y-3'>
      <h2 className='text-2xl font-semibold tracking-tight'>{exercise.exerciseName}</h2>
      {exercise.sets.length > 0 ? (
        <WorkoutSetTable exerciseId={exercise.exerciseId} sets={exercise.sets} />
      ) : (
        <p className='text-muted-foreground'>Start by adding a set</p>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button className={'w-full'}>
            <Plus/> ADD SET
          </Button>
        </SheetTrigger>
        <WorkoutSetForm exerciseId={exercise.exerciseId} />
      </Sheet>
    </div>)
}
