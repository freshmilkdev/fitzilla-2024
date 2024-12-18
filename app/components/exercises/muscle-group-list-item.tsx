import { AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { MuscleGroupWithExercises, Exercise } from "~/types";
import { ExerciseListItem } from "~/components/exercises/exercise-list-item";
import { Badge } from "~/components/ui/badge";

export default function MuscleGroupListItem({ name, exercises }: MuscleGroupWithExercises) {
  return (
    <AccordionItem value={name} className="px-4">
      <AccordionTrigger className={'text-lg font-medium hover:no-underline py-3'}>
        <div className='flex grow justify-between pr-2'>
          <span>{name}</span>
          <Badge className="h-6 w-6 items-center justify-center font-normal">{exercises.length}</Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-0 pb-2'>
        <ul>
          {exercises.map((exercise: Exercise) => (
            <ExerciseListItem key={`exercise-${exercise.id}`} {...exercise} />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
