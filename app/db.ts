import Dexie, { type EntityTable } from 'dexie';

interface MuscleGroup {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const db = new Dexie('WorkoutDatabase') as Dexie & {
  muscleGroups: EntityTable<
    MuscleGroup,
    'id' // primary key "id" for typings
  >;
};

// Schema declaration
db.version(1).stores({
  muscleGroups: '++id, name, createdAt, updatedAt' // primary key "id" for runtime
});

export type { MuscleGroup };
export { db }; 