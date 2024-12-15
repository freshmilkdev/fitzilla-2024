import { AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { Exercise, MuscleGroup } from "~/types";
import { ExerciseListItem } from "~/components/exercises/exercise-list-item";
import { Badge } from "~/components/ui/badge";

export default function MuscleGroupListItem({ name, exercises }: MuscleGroup) {
  return (
    <AccordionItem value={name} className="px-4">
      <AccordionTrigger className={'text-lg font-medium hover:no-underline'}>
        <div className='flex grow justify-between pr-4'>
          <span>{name}</span>
          <Badge>3</Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className='py-2'>
        <ul>
          {exercises.map(({ id, name }: Exercise) => (
            <ExerciseListItem key={`exercise-${id}`} name={name} id={id} />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
