import type {Exercise} from "~/types";
import {Separator} from "~/components/ui/separator";
import {NavLink} from "react-router";
import {ChevronRight} from "lucide-react";
import {Badge} from "~/components/ui/badge";
import {routePaths} from "~/routes";

const exercises: Exercise[] = [
  {
    id: 1, 
    name: 'Pull Up',
    muscleGroupId: 1,
    isBodyweight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2, 
    name: 'Lat Pulldown',
    muscleGroupId: 1,
    isBodyweight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3, 
    name: 'Seated Row',
    muscleGroupId: 1,
    isBodyweight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4, 
    name: 'Bent Over Row',
    muscleGroupId: 1,
    isBodyweight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5, 
    name: 'Deadlift',
    muscleGroupId: 1,
    isBodyweight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6, 
    name: 'Squat',
    muscleGroupId: 1,
    isBodyweight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]
export default function WorkoutExerciseList() {
  return (
    <ul>
      {exercises.map(({id, name}: Exercise) =>
        <li key={`exercise-${id}`} className='hover:bg-slate-100 dark:hover:bg-slate-950 transition duration-200'>
          <NavLink to={`${routePaths.exercises}/${id}`} className='flex items-center pr-2 py-3'>
            <span className='flex grow'>
              <span className='ml-2'>{name}</span>
              </span>
            <Badge variant='secondary'>3</Badge>
            <ChevronRight size={18}/>
          </NavLink>
          <Separator/>
        </li>)}
    </ul>)
}
