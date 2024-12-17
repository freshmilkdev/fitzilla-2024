import { MuscleGroupList } from "~/components/exercises/muscle-group-list";
import { ExerciseForm } from "~/components/exercises/exercise-form";
import { Sheet, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

export default function Exercises() {


  return (
    <div className="container py-8">
      <MuscleGroupList />
      <Sheet>
        <SheetTrigger asChild>
          <Button className={'fixed mx-auto left-1/2 transform -translate-x-1/2 bottom-20 rounded-full h-14 w-14'}>
            <Plus className={'!w-8 !h-8'} />
          </Button>
        </SheetTrigger>
        <ExerciseForm />
      </Sheet>
    </div>
  )
}
