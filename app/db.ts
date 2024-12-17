import Dexie, { type EntityTable } from 'dexie';
import type { MuscleGroup, Exercise } from '~/types';

const db = new Dexie('WorkoutDatabase') as Dexie & {
  muscleGroups: EntityTable<MuscleGroup, 'id'>;
  exercises: EntityTable<Exercise, 'id'>;
};

// Schema declaration
db.version(1).stores({
  muscleGroups: '++id, name, createdAt, updatedAt',
  exercises: '++id, name, muscleGroupId, createdAt, updatedAt'
});

// Initialize database with seed data
const initializeDatabase = async () => {
  console.log("Checking database...");
  const muscleGroupCount = await db.muscleGroups.count();
  console.log("Current muscle groups count:", muscleGroupCount);

  if (muscleGroupCount > 0) {
    console.log("Database already seeded");
    return;
  }

  const muscleGroups: Omit<MuscleGroup, 'id'>[] = [
    {
      name: "Back",
      description: "Muscles of the back including lats, traps, and rhomboids",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Chest",
      description: "Pectoral muscles",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Legs",
      description: "Lower body muscles including quadriceps, hamstrings, and calves",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  try {
    console.log("Seeding muscle groups...");
    const muscleGroupIds = await db.transaction('rw', db.muscleGroups, db.exercises, async () => {
      const ids = await db.muscleGroups.bulkAdd(muscleGroups, { allKeys: true });
      console.log("Added muscle groups with IDs:", ids);
      return ids;
    });

    const exercises: Omit<Exercise, 'id'>[] = [
      // Back exercises
      {
        name: "Pull-ups",
        muscleGroupId: muscleGroupIds[0],
        isBodyweight: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bent-over Rows",
        muscleGroupId: muscleGroupIds[0],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lat Pulldowns",
        muscleGroupId: muscleGroupIds[0],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Chest exercises
      {
        name: "Bench Press",
        muscleGroupId: muscleGroupIds[1],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Push-ups",
        muscleGroupId: muscleGroupIds[1],
        isBodyweight: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dumbbell Flyes",
        muscleGroupId: muscleGroupIds[1],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Legs exercises
      {
        name: "Squats",
        muscleGroupId: muscleGroupIds[2],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Deadlifts",
        muscleGroupId: muscleGroupIds[2],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leg Press",
        muscleGroupId: muscleGroupIds[2],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    console.log("Seeding exercises...");
    await db.exercises.bulkAdd(exercises);
    
    const finalCounts = await Promise.all([
      db.muscleGroups.count(),
      db.exercises.count()
    ]);
    console.log(`Final counts - Muscle Groups: ${finalCounts[0]}, Exercises: ${finalCounts[1]}`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Only run initialization in the browser
if (typeof window !== 'undefined') {
  initializeDatabase();
}

export { db }; 