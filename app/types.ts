// Base types that match database structure
export interface MuscleGroup {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: number;
  name: string;
  description?: string;
  muscleGroupId: number;
  isBodyweight: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface Program {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgramExercise {
  id: number;
  programId: number;
  exerciseId: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Extended types for UI with relationships
export interface MuscleGroupWithExercises extends MuscleGroup {
  exercises: Exercise[];
}

// Form types
export interface CreateExerciseForm {
  name: string;
  muscleGroupId: number;
}

export interface CreateMuscleGroupForm {
  name: string;
  description?: string;
}

// API response types
export interface ExerciseResponse extends Exercise {
  muscleGroup: MuscleGroup;
}

export interface MuscleGroupResponse extends MuscleGroup {
  exerciseCount: number;
}


// Extended type for UI
export interface ProgramWithExercises extends Program {
  exercises: Exercise[];
}

// Add these new interfaces
export const WORKOUT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned'
} as const;

export type WorkoutStatus = typeof WORKOUT_STATUS[keyof typeof WORKOUT_STATUS];

export interface WorkoutSet {
  weight?: number;
  reps: number;
  notes?: string;
}

export interface WorkoutExercise {
  id?: number;
  workoutId: number;
  exerciseId: number;
  exerciseName: string;
  description?: string;
  isBodyweight: boolean;
  order: number;
  sets: WorkoutSet[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Workout {
  id?: number;
  programId?: number;
  status: WorkoutStatus;
  startedAt: Date;
  updatedAt: Date;
  // UI-only fields
  workoutName?: string;
  workoutDescription?: string;
}