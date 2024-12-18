import { Accordion } from "~/components/ui/accordion"
import { useGroupedExercises } from "~/hooks/use-grouped-exercises";
import MuscleGroupListItem from "~/components/exercises/muscle-group-list-item";
import type { MuscleGroupWithExercises } from "~/types";

export function MuscleGroupList() {
  const groupedExercises = useGroupedExercises();

  if (!groupedExercises) {
    return <div>Loading exercises...</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {groupedExercises.map((muscleGroup) => (
        <MuscleGroupListItem
          {...muscleGroup}
          key={muscleGroup.id}
        />
      ))}
    </Accordion>
  );
}
