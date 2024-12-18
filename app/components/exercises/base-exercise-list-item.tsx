import * as React from "react"
import type { Exercise } from "~/types";
import { Checkbox } from "~/components/ui/checkbox"

interface BaseExerciseListItemProps {
  exercise: Exercise;
  children?: React.ReactNode;
}

export function BaseExerciseListItem({ exercise, children }: BaseExerciseListItemProps) {
  const { id, name } = exercise;

  return (
    <li>
      <div className='flex justify-between'>
        <div className="flex items-center space-x-2 grow">
          <Checkbox id={id.toString()}/>
          <label
            htmlFor={id.toString()}
            className="py-1  text-base h-full w-full flex items-center cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {name}
          </label>
        </div>
        {children}
      </div>
    </li>
  )
} 