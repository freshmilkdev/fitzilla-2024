import { AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { MuscleGroupWithExercises, Exercise } from "~/types";
import { ExerciseListItem } from "~/components/exercises/exercise-list-item";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { useSelectedExercises } from "~/context/selected-exercises-context";
import { useMemo } from "react";

import { ArmsIcon } from "~/components/icons/arms-icon";
import MuscleGroupIcon from "../icons/muscle-group-icon";

interface MuscleGroupListItemProps extends MuscleGroupWithExercises {
  variant?: 'plain' | 'withCheckbox' | 'withOptions';
  id: number;
}

// TODO: muscle group icon
const SelectedExercisesBadge = ({ exercises }: { exercises: Exercise[] }) => {
  const { selectedExercises, toggleExercise } = useSelectedExercises();

  const countSelectedExercises = useMemo(() => {
    return exercises.filter(exercise => selectedExercises.has(exercise.id)).length;
  }, [exercises, selectedExercises]);

  return (
    !countSelectedExercises ? null :
      <Badge variant="secondary" className="h-6 items-center justify-center font-normal">
        Selected: {countSelectedExercises}
      </Badge>
  )
};

export default function MuscleGroupListItem({ name, exercises, variant = 'withOptions', id }: MuscleGroupListItemProps) {

  return (
    <AccordionItem value={name} className={cn(variant === 'withOptions' && "px-4")}>
      <AccordionTrigger className={'text-lg font-medium hover:no-underline py-3'}>
        <div className='flex grow justify-between pr-2'>
          <div className='flex items-center gap-2'>
            <MuscleGroupIcon muscleGroupId={id} />
            <span>{name}</span>
          </div>

          {variant === 'withCheckbox' ?
            <SelectedExercisesBadge exercises={exercises} /> :
            <Badge className="h-6 w-6 items-center justify-center font-normal">{exercises.length}</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-0 pb-2'>
        <ul>
          {exercises.map((exercise: Exercise) => (
            <ExerciseListItem key={`exercise-${exercise.id}`} {...exercise} variant={variant} />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
