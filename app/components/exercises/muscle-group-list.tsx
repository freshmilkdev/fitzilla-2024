import { Accordion } from "~/components/ui/accordion"
import MuscleGroupListItem from "~/components/exercises/muscle-group-list-item";
import type { MuscleGroupWithExercises } from "~/types";

export function MuscleGroupList({ groupedExercises, showControls = true }: { groupedExercises: MuscleGroupWithExercises[], showControls?: boolean }) {

  return (
    <Accordion type="single" collapsible className="w-full">
      {groupedExercises.map((muscleGroup) => (
        <MuscleGroupListItem
          {...muscleGroup}
          key={muscleGroup.id}
          showControls={showControls}
        />
      ))}
    </Accordion>
  );
}
