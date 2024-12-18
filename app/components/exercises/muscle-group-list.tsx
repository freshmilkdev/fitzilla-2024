import { Accordion } from "~/components/ui/accordion"
import MuscleGroupListItem from "~/components/exercises/muscle-group-list-item";
import type { MuscleGroupWithExercises } from "~/types";

interface MuscleGroupListProps {
  groupedExercises: MuscleGroupWithExercises[];
  variant?: 'plain' | 'withCheckbox' | 'withOptions';
}

export function MuscleGroupList({ 
  groupedExercises, 
  variant = 'withOptions' 
}: MuscleGroupListProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {groupedExercises.map((muscleGroup) => (
        <MuscleGroupListItem
          {...muscleGroup}
          key={muscleGroup.id}
          variant={variant}
        />
      ))}
    </Accordion>
  );
}
