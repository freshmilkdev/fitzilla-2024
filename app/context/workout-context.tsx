import * as React from "react";
import { db } from "~/db";
import type { Workout, WorkoutExercise, WorkoutSet } from "~/types";
import { WORKOUT_STATUS } from '~/types';

interface WorkoutContextType {
  currentWorkout: Workout | null;
  workoutExercises: WorkoutExercise[];
  startWorkout: (programId?: number) => Promise<void>;
  completeWorkout: () => Promise<void>;
  abandonWorkout: () => Promise<void>;
  updateExercise: (exerciseId: number, updates: Partial<WorkoutExercise>) => Promise<void>;
  addSet: (exerciseId: number) => Promise<void>;
  updateSet: (exerciseId: number, setIndex: number, updates: Partial<WorkoutSet>) => Promise<void>;
}

export const WorkoutContext = React.createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkout, setCurrentWorkout] = React.useState<Workout | null>(null);
  const [workoutExercises, setWorkoutExercises] = React.useState<WorkoutExercise[]>([]);

  // Load active workout on mount
  React.useEffect(() => {
    const loadActiveWorkout = async () => {
      const workout = await db.workouts
        .where('status')
        .equals(WORKOUT_STATUS.ACTIVE)
        .first();

      if (workout) {
        let programName = 'Custom Workout';
        let programDescription;

        if (workout.programId) {
          const program = await db.programs.get(workout.programId);
          if (program) {
            programName = program.name;
            programDescription = program.description;
          }
        }

        setCurrentWorkout({ 
          ...workout, 
          workoutName: programName,
          workoutDescription: programDescription 
        });
        const exercises = await db.workoutExercises
          .where('workoutId')
          .equals(workout.id!)
          .toArray();
        setWorkoutExercises(exercises);
      }
    };

    loadActiveWorkout();
  }, []);

  const startWorkout = async (programId?: number) => {
    let programName = 'Custom Workout';
    let programDescription;

    if (programId) {
      const program = await db.programs.get(programId);
      if (program) {
        programName = program.name;
        programDescription = program.description;
      }
    }

    const workout: Workout = {
      programId,
      status: WORKOUT_STATUS.ACTIVE,
      startedAt: new Date(),
      updatedAt: new Date()
    };

    const workoutId = await db.workouts.add(workout);
    setCurrentWorkout({ 
      ...workout, 
      id: workoutId,
      workoutName: programName ?? 'Custom Workout',
      workoutDescription: programDescription ?? ''
    });
    
    // If starting from a program, initialize with program exercises
    if (programId) {
      const programExercises = await db.programExercises
        .where('programId')
        .equals(programId)
        .toArray();

      const exercises = await Promise.all(
        programExercises.map(async (pe, index) => {
          const exercise = await db.exercises.get(pe.exerciseId);
          return {
            workoutId: workoutId as number,
            exerciseId: pe.exerciseId,
            exerciseName: exercise!.name,
            order: index,
            sets: [],
            createdAt: new Date(),
            updatedAt: new Date()
          } as WorkoutExercise;
        })
      );

      await db.workoutExercises.bulkAdd(exercises);
      setWorkoutExercises(exercises);
    }
  };

  const completeWorkout = async () => {
    if (!currentWorkout?.id) return;

    await db.workouts.update(currentWorkout.id, {
      status: WORKOUT_STATUS.COMPLETED,
      updatedAt: new Date()
    });

    setCurrentWorkout(null);
    setWorkoutExercises([]);
  };

  const abandonWorkout = async () => {
    if (!currentWorkout?.id) return;

    await db.workouts.update(currentWorkout.id, {
      status: WORKOUT_STATUS.ABANDONED,
      updatedAt: new Date()
    });

    setCurrentWorkout(null);
    setWorkoutExercises([]);
  };

  const updateExercise = async (exerciseId: number, updates: Partial<WorkoutExercise>) => {
    const exercise = workoutExercises.find(e => e.exerciseId === exerciseId);
    if (!exercise?.id) return;

    await db.workoutExercises.update(exercise.id, {
      ...updates,
      updatedAt: new Date()
    });

    setWorkoutExercises(exercises => 
      exercises.map(e => 
        e.exerciseId === exerciseId ? { ...e, ...updates } : e
      )
    );
  };

  const addSet = async (exerciseId: number) => {
    const exercise = workoutExercises.find(e => e.exerciseId === exerciseId);
    if (!exercise?.id) return;

    const newSet: WorkoutSet = {
      reps: 0,
      notes: ''
    };

    const updatedExercise = {
      ...exercise,
      sets: [...exercise.sets, newSet],
      updatedAt: new Date()
    };

    await db.workoutExercises.update(exercise.id, updatedExercise);

    setWorkoutExercises(exercises =>
      exercises.map(e =>
        e.exerciseId === exerciseId ? updatedExercise : e
      )
    );
  };

  const updateSet = async (exerciseId: number, setIndex: number, updates: Partial<WorkoutSet>) => {
    const exercise = workoutExercises.find(e => e.exerciseId === exerciseId);
    if (!exercise?.id) return;

    const updatedSets = exercise.sets.map((set, index) =>
      index === setIndex ? { ...set, ...updates } : set
    );

    const updatedExercise = {
      ...exercise,
      sets: updatedSets,
      updatedAt: new Date()
    };

    await db.workoutExercises.update(exercise.id, updatedExercise);

    setWorkoutExercises(exercises =>
      exercises.map(e =>
        e.exerciseId === exerciseId ? updatedExercise : e
      )
    );
  };

  const value = React.useMemo(() => ({
    currentWorkout,
    workoutExercises,
    startWorkout,
    completeWorkout,
    abandonWorkout,
    updateExercise,
    addSet,
    updateSet
  }), [currentWorkout, workoutExercises]);

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = React.useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
} 