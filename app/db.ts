import Dexie, { type EntityTable } from 'dexie';
import type { MuscleGroup, Exercise, ProgramExercise, Program, WorkoutExercise, Workout, UserSettings } from '~/types';

const db = new Dexie('WorkoutDatabase') as Dexie & {
  muscleGroups: EntityTable<MuscleGroup, 'id'>;
  exercises: EntityTable<Exercise, 'id'>;
  programs: EntityTable<Program, 'id'>;
  programExercises: EntityTable<ProgramExercise, 'id'>;
  workouts: EntityTable<Workout, 'id'>;
  workoutExercises: EntityTable<WorkoutExercise, 'id'>;
  settings: EntityTable<UserSettings, 'id'>;
};

// Schema declaration
db.version(2).stores({
  muscleGroups: '++id, name, createdAt, updatedAt',
  exercises: '++id, name, muscleGroupId, createdAt, updatedAt',
  programs: '++id, name, createdAt, updatedAt',
  programExercises: '++id, programId, exerciseId, order, createdAt, updatedAt',
  workouts: '++id, programId, status, startedAt, updatedAt',
  workoutExercises: '++id, workoutId, exerciseId, order, createdAt, updatedAt',
  settings: '++id, theme, colorScheme, measurementUnit'
}).upgrade(tx => {
  // Handle any data migration if needed
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
      name: "Chest",
      description: "Pectoral muscles",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Back",
      description: "Muscles of the back including lats, traps, and rhomboids",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Legs",
      description: "Lower body muscles including quadriceps, hamstrings, glutes, and calves",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Arms",
      description: "Upper body muscles including biceps, triceps, and forearms",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Shoulders",
      description: "Shoulder muscles",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Abs",
      description: "Abdominal muscles",
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
      // Legs exercises
      {
        name: "Squats",
        muscleGroupId: muscleGroupIds[2],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leg Extensions",
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
      // Arms exercises
      {
        name: "Bicep Curls",
        muscleGroupId: muscleGroupIds[3],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hammer Curls",
        muscleGroupId: muscleGroupIds[3],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tricep Dips",
        muscleGroupId: muscleGroupIds[3],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Shoulders exercises
      {
        name: "Shoulder Press",
        muscleGroupId: muscleGroupIds[4],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dumbbell Lateral Raises",
        muscleGroupId: muscleGroupIds[4],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Front Raises",
        muscleGroupId: muscleGroupIds[4],
        isBodyweight: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Abs exercises
      {
        name: "Plank",
        muscleGroupId: muscleGroupIds[5],
        isBodyweight: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leg Raises",
        muscleGroupId: muscleGroupIds[5],
        isBodyweight: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Crunches",
        muscleGroupId: muscleGroupIds[5],
        isBodyweight: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    console.log("Seeding exercises...");
    await db.exercises.bulkAdd(exercises);

    const programs = [
      {
        name: "Full Body Workout",
        description: "A complete full body workout program",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    console.log("Seeding programs...");
    const programIds = await db.programs.bulkAdd(programs, { allKeys: true });

    const programExercises = [
      {
        programId: programIds[0],
        exerciseId: 1, // Bench Press
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        programId: programIds[0],
        exerciseId: 4, // Squats
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        programId: programIds[0],
        exerciseId: 5, // Deadlifts
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    console.log("Seeding program exercises...");
    await db.programExercises.bulkAdd(programExercises);

    const finalCounts = await Promise.all([
      db.muscleGroups.count(),
      db.exercises.count(),
      db.programs.count(),
      db.programExercises.count()
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