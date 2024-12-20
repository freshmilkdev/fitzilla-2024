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
}

export default function WorkoutSetTable({exerciseId, sets}: WorkoutSetTableProps) {
  const {updateSet} = useWorkout();

  return (
    <Sheet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right"/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sets.map((set, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{set.weight}</TableCell>
              <TableCell>{set.reps}</TableCell>
              <TableCell>{set.notes}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size={'icon'}>
                        <Ellipsis/>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <WorkoutSetForm exerciseId={exerciseId}/>
    </Sheet>
  )
}
