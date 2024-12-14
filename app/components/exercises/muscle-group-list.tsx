import {Accordion,} from "~/components/ui/accordion"
import type {MuscleGroup} from "~/types";
import MuscleGroupListItem from "~/components/exercises/muscle-group-list-item";

const muscleGroups: MuscleGroup[] = [
  {
    name: "Back", exercises: [
      {id: '1', name: 'Pull Up'}
    ]
  }
]

export function MuscleGroupList() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <>
        {muscleGroups.map(({name, exercises}, ix) => (
          <MuscleGroupListItem
            name={name}
            exercises={exercises}
            key={`muscle-group-${ix}`}
          />
        ))}
      </>
    </Accordion>
  )
}
