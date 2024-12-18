import * as React from "react"
import type { Exercise } from "~/types";
import { Separator } from "../ui/separator";

interface BaseExerciseListItemProps {
  exercise: Exercise;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
}

export function BaseExerciseListItem({ exercise, children, prefix }: BaseExerciseListItemProps) {
  return (
    <li>
      <div className='flex justify-between items-center'>
        <div className="flex items-center space-x-2 py-2 grow">
          {prefix}
          <label
            htmlFor={exercise.id.toString()}
            className="text-base h-full w-full flex items-center cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {exercise.name}
          </label>
        </div>
        {children}
      </div>
      {/* <Separator /> */}
    </li>
  )
} 