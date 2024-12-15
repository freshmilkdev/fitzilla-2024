import type {Exercise} from "~/types";
import {Separator} from "~/components/ui/separator";
import {NavLink} from "react-router";
import {ChevronRight} from "lucide-react";

const exercises: Exercise[] = [
  {id: '1', name: 'Pull Up'},
  {id: '2', name: 'Lat Pulldown'},
  {id: '3', name: 'Seated Row'},
  {id: '4', name: 'Bent Over Row'},
  {id: '5', name: 'Deadlift'},
  {id: '6', name: 'Squat'},
]
export default function WorkoutExerciseList() {
  return (
    <ul>
      {exercises.map(({id, name}: Exercise) =>
        <li key={`exercise-${id}`} className='hover:bg-slate-100 dark:hover:bg-slate-950 transition duration-200'>
          <NavLink to={'/'} className=' flex items-center px-4 py-2'>
            <span className='flex grow'>
              <span className='ml-2'>{name}</span>
              </span>
            <ChevronRight size={18}/>
          </NavLink>
          <Separator/>
        </li>)}
    </ul>)
}
