import { Accordion } from "~/components/ui/accordion"
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";
import MuscleGroupListItem from "~/components/exercises/muscle-group-list-item";
import type { MuscleGroupWithExercises } from "~/types";

export function MuscleGroupList() {
  const muscleGroups = useLiveQuery(
    async () => {
      const groups = await db.muscleGroups.toArray();
      const groupsWithExercises: MuscleGroupWithExercises[] = await Promise.all(
        groups.map(async (group) => ({
          ...group,
          exercises: await db.exercises.where('muscleGroupId').equals(group.id).toArray()
        }))
      );
      return groupsWithExercises;
    },
    [],
    []
  );

  if (!muscleGroups) {
    return <div>Loading muscle groups...</div>;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {muscleGroups.map((muscleGroup) => (
        <MuscleGroupListItem
          {...muscleGroup}
          key={muscleGroup.id}
        />
      ))}
    </Accordion>
  );
}
