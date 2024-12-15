import {Plus} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Sheet, SheetTrigger} from "~/components/ui/sheet";
import {WorkoutSetForm} from "~/components/workout/workout-set-form";

export default function WorkoutExercise({id}: { id: string }) {
  console.log(id)
  return (
    <div className='p-4 space-y-3'>
      <h3 className='text-2xl font-semibold tracking-tight'>Exercise {id}</h3>
      <p className='text-muted-foreground'>Start by adding a set</p>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={'w-full'}>
            <Plus/> ADD SET
          </Button>
        </SheetTrigger>
        <WorkoutSetForm/>
      </Sheet>
    </div>)
}
