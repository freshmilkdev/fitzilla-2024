import {Plus} from "lucide-react";
import {MuscleGroupList} from "~/components/exercises/muscle-group-list";
import {Button} from "~/components/ui/button";

export default function Exercises() {
  return (
    <div>
      <MuscleGroupList/>
      <Button className={'fixed mx-auto left-1/2 transform -translate-x-1/2 bottom-20 rounded-full h-14 w-14'}>
        <Plus className={'!w-8 !h-8'}/>
      </Button>
    </div>
  )
}
