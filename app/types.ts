export interface Exercise {
  id: string;
  name: string;
}
export interface MuscleGroup {
  name: string;
  exercises: Exercise[]
}