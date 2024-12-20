import { useWorkout } from "~/context/workout-context";
import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { NavLink } from "react-router";
import { routePaths } from "~/routes";
import { ContentHeader } from "../layout/content-header";
import type { Workout } from "~/types";
import type { WorkoutExercise } from "~/types";

export default function WorkoutExerciseList({ workoutExercises, currentWorkout }: { workoutExercises: WorkoutExercise[], currentWorkout: Workout }) {


  if (!workoutExercises.length) {
    return <div className="p-4 text-center text-muted-foreground">No exercises added yet.</div>;
  }

  return (
    <ul>
      {workoutExercises.map((exercise) => (
        <li key={exercise.id} className='hover:bg-slate-100 dark:hover:bg-slate-950 transition duration-200'>
          <NavLink
            to={`${routePaths.workout}/${exercise.exerciseId}`}
            className='flex items-center px-4 py-3'
          >
            <span className='flex grow'>
              <span>{exercise.exerciseName}</span>
            </span>
            <Badge variant='secondary' className="mr-2">
              {exercise.sets.length}
            </Badge>
            <ChevronRight size={18} className="text-muted-foreground" />
          </NavLink>
          <Separator />
        </li>
      ))}
    </ul>
  );
}
