import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {Button} from "~/components/ui/button";
import {Copy, Edit, Ellipsis, Trash2} from "lucide-react";
import {Sheet, SheetTrigger} from "~/components/ui/sheet";
import * as React from "react";
import {WorkoutSetForm} from "~/components/workout/workout-set-form";
import WorkoutDeleteSetDialog from "~/components/workout/workout-delete-set-dialog";
import {Dialog, DialogTrigger} from "~/components/ui/dialog";
import {useWorkout} from "~/context/workout-context";
import type {WorkoutSet} from "~/types";

interface WorkoutSetTableProps {
  exerciseId: number;
  sets: WorkoutSet[];
  isBodyweight: boolean;
}

export default function WorkoutSetTable({exerciseId, sets, isBodyweight}: WorkoutSetTableProps) {
  const {updateSet} = useWorkout();

  return (
    <div className="divide-y">
      {sets.map((set, index) => (
        <div key={index} className="py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">#{index + 1}</span>
              <span>
                {set.reps} reps {!isBodyweight && set.weight && `× ${set.weight}kg`}
              </span>
            </div>
            
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => {
                    const newSet = {...set};
                    updateSet(exerciseId, sets.length, newSet);
                  }}>
                    <Copy/>
                    <span>Copy</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <SheetTrigger asChild>
                    <DropdownMenuItem>
                      <Edit/>
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </SheetTrigger>
                  <DropdownMenuSeparator/>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Trash2/>
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <WorkoutDeleteSetDialog exerciseId={exerciseId} setIndex={index}/>
            </Dialog>
          </div>
          
          {set.notes && (
            <div className="pl-10 pt-0.5 text-sm text-muted-foreground">
              "{set.notes}"
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
