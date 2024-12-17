import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

import type { Exercise } from "~/types";
import { Edit, Ellipsis, History, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox"
import { useExerciseSheet } from "./exercise-sheet-context";

export function ExerciseListItem(exercise: Exercise) {
  const { id, name } = exercise;
  const { setIsOpen, setExercise } = useExerciseSheet();

  const handleEdit = () => {
    setExercise(exercise);
    setIsOpen(true);
  };

  return (
    <li>
      <div className='flex justify-between'>
        <div className="flex items-center space-x-2 grow">
          <Checkbox id={id.toString()}/>
          <label
            htmlFor={id.toString()}
            className="text-base h-full w-full flex items-center cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {name}
          </label>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className="rounded-full">
              <Ellipsis/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <History/>
              <span>History</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={handleEdit}>
              <Edit/>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <Trash2/>
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  )
}
