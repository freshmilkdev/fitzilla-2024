import {AccordionContent, AccordionItem, AccordionTrigger} from "~/components/ui/accordion";
import type {Exercise} from "~/types";
import {Separator} from "@radix-ui/react-separator";


interface IExerciseListItem {
  muscleGroup: string;
  exercises: Exercise[]
}

export default function ExerciseListItem({muscleGroup, exercises}: IExerciseListItem) {
  return (
    <AccordionItem value="item-1" className={'px-4'}>
      <AccordionTrigger>{muscleGroup}</AccordionTrigger>
      <AccordionContent>
        <ul>
          {
            exercises.map(({id, name}: Exercise) => <li key={`exercise${id}`}>
              <p>
                <span>{name}</span>
              </p>
              <Separator orientation="vertical" />
            </li>)
          }
        </ul>
      </AccordionContent>
    </AccordionItem>)
}
