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

interface WorkoutSet {
  weight: number;
  reps: number;
  notes: string;
}

const workoutSets: WorkoutSet[] = [
  {weight: 100, reps: 8, notes: 'Good form'},
  {weight: 110, reps: 6, notes: 'Struggled on last rep'},
  {weight: 105, reps: 10, notes: 'Felt strong'},
];


export default function WorkoutSetTable() {
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
          {workoutSets.map((set, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{set.weight}</TableCell>
              <TableCell>{set.reps}</TableCell>
              <TableCell>{set.notes}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='' size={'icon'}>
                        <Ellipsis/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
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
                  <WorkoutDeleteSetDialog/>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <WorkoutSetForm/>
    </Sheet>


  )
}
