import { AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { MuscleGroupWithExercises, Exercise } from "~/types";
import { ExerciseListItem } from "~/components/exercises/exercise-list-item";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface MuscleGroupListItemProps extends MuscleGroupWithExercises {
  variant?: 'plain' | 'withCheckbox' | 'withOptions';
}

export default function MuscleGroupListItem({ name, exercises, variant = 'withOptions' }: MuscleGroupListItemProps) {
 

  return (
    <AccordionItem value={name}  className={cn(variant !== 'plain' && "px-4")}>
      <AccordionTrigger className={'text-lg font-medium hover:no-underline py-3'}>
        <div className='flex grow justify-between pr-2'>
          <span>{name}</span>
          <Badge className="h-6 w-6 items-center justify-center font-normal">{exercises.length}</Badge>
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
