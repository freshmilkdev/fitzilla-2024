import { Edit, Ellipsis, History, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Exercise } from "~/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { useExerciseSheet } from "../../context/exercise-sheet-context";
import { useDialog } from "../../context/dialog-context";
import { db } from "~/db";
import { BaseExerciseListItem } from "./base-exercise-list-item";
import { Checkbox } from "../ui/checkbox";

interface ExerciseListItemProps extends Exercise {
  variant?: 'plain' | 'withCheckbox' | 'withOptions';
}

function ExerciseItemWithOptions(exercise: Exercise) {
  const { setIsOpen, setExercise } = useExerciseSheet();
  const { showConfirmDialog } = useDialog();

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
    <BaseExerciseListItem exercise={exercise}>
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
    </BaseExerciseListItem>
  );
}

export function ExerciseListItem({ variant = 'withOptions', ...exercise }: ExerciseListItemProps) {
  if (variant === 'plain') {
    return <BaseExerciseListItem exercise={exercise} />;
  }

  if (variant === 'withCheckbox') {
    return (
      <BaseExerciseListItem 
        exercise={exercise}
        prefix={<Checkbox id={exercise.id.toString()} />}
      />
    );
  }

  return <ExerciseItemWithOptions {...exercise} />;
}
