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
import { useExerciseSheet } from "../../context/exercise-sheet-context";
import { useDialog } from "../../context/dialog-context";
import { db } from "~/db";

export function ExerciseListItem(exercise: Exercise) {
  const { setIsOpen, setExercise } = useExerciseSheet();
  const { showConfirmDialog } = useDialog();
  const { id, name } = exercise;

  const handleEdit = () => {
    setExercise(exercise);
    setIsOpen(true);
  };

  const handleDelete = () => {
    showConfirmDialog({
      title: "Delete Exercise",
      description: `Are you sure you want to delete "${exercise.name}"?`,
      onConfirm: async () => {
        try {
          await db.exercises.delete(exercise.id);
        } catch (error) {
          console.error("Error deleting exercise:", error);
        }
      },
    });
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
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2/>
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  )
}
