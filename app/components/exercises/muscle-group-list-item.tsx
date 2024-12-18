import { AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { MuscleGroupWithExercises, Exercise } from "~/types";
import { ExerciseListItem, SimpleExerciseListItem } from "~/components/exercises/exercise-list-item";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface MuscleGroupListItemProps extends MuscleGroupWithExercises {
  showControls?: boolean;
}

export default function MuscleGroupListItem({ name, exercises, showControls = true }: MuscleGroupListItemProps) {
  const ListItemComponent = showControls ? ExerciseListItem : SimpleExerciseListItem;

  return (
    <AccordionItem value={name}  className={cn(showControls && "px-4")}>
      <AccordionTrigger className={'text-lg font-medium hover:no-underline py-3'}>
        <div className='flex grow justify-between pr-2'>
          <span>{name}</span>
          <Badge className="h-6 w-6 items-center justify-center font-normal">{exercises.length}</Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-0 pb-2'>
        <ul>
          {exercises.map((exercise: Exercise) => (
            <ListItemComponent key={`exercise-${exercise.id}`} {...exercise} />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
