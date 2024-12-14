import {AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";
import type {Exercise, MuscleGroup} from "~/types";
import {ExerciseListItem} from "~/components/exercises/exercise-list-item";

export default function MuscleGroupListItem({name, exercises}: MuscleGroup) {
  return (
    <AccordionItem value={name} className="px-4">
      <AccordionTrigger className={'text-lg font-medium hover:no-underline'}>{name}</AccordionTrigger>
      <AccordionContent className='py-2'>
        <ul>
          {exercises.map(({id, name}: Exercise) => (
            <ExerciseListItem key={`exercise-${id}`} name={name} id={id}/>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
