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