import { useLiveQuery } from "dexie-react-hooks";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import { db } from "~/db";
import type { Exercise, ProgramWithExercises } from "~/types";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { routePaths } from "~/routes";


export function ProgramList() {
  const programs: ProgramWithExercises[] = useLiveQuery(
    async () => {
      const programList = await db.programs.toArray();

      const programsWithExercises: ProgramWithExercises[] = await Promise.all(
        programList.map(async (program) => {
          const programExercises = await db.programExercises
            .where('programId')
            .equals(program.id)
            .sortBy('order');

          const exercises = await Promise.all(
            programExercises.map(pe =>
              db.exercises.get(pe.exerciseId)
            )
          );

          return {
            ...program,
            exercises: exercises.filter((e): e is Exercise => e !== undefined)
          };
        })
      );

      return programsWithExercises;
    },
    [],
    []
  );

  if (!programs) {
    return <div>Loading programs...</div>;
  }

  return (
    <ul>
      {programs.map(({ id, name, description, exercises }) => (
        <li key={`exercise-${id}`} className='hover:bg-slate-100 dark:hover:bg-slate-950 transition duration-200'>
          <NavLink to={`${routePaths.programs}/${id}`} className='flex items-center px-4 py-3'>
            <span className='flex flex-col grow text-lg pr-2'>
              <span className='font-medium'>{name}</span>
              <span className='text-muted-foreground text-sm'>{description}</span>
            </span>
          
            <Badge variant='secondary'>{exercises.length}</Badge>
            <ChevronRight size={18} />
          </NavLink>
          <Separator />
        </li>
      ))}
    </ul>
  );
} 