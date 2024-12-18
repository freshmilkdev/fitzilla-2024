import { useLiveQuery } from "dexie-react-hooks";
import { db } from "~/db";
import type { MuscleGroupWithExercises } from "~/types";

export function useMuscleGroups() {
  return useLiveQuery(
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
} 