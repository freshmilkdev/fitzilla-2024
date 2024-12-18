import { useLiveQuery } from "dexie-react-hooks";

import { db } from "~/db";
import { PageHeader } from "../layout/page-header";
import { Separator } from "../ui/separator";
import type { Exercise, Program } from "~/types";
import { Button } from "../ui/button";
import { Pencil, Plus, History, Edit, Trash2, Ellipsis } from "lucide-react";
import type { Route } from "../../routes/+types/program";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { AppHeader } from "../layout/app-header";
import { useProgramSheet } from "../../context/program-sheet-context";
import { Sheet } from "../ui/sheet";
import { ProgramForm } from "./program-form";
import { useSelectedExercises } from "../../context/selected-exercises-context";
import { useDialog } from "../../context/dialog-context";
import { NavLink, useNavigate } from "react-router";
import { routePaths } from "~/routes";
import { useWorkout } from "~/context/workout-context";
export default function Program({
    id,
}: {
    id: string | null;
}) {
    const { isOpen, setIsOpen, setProgram } = useProgramSheet();
    const { setSelectedExercises } = useSelectedExercises();
    const { showConfirmDialog } = useDialog();
    const navigate = useNavigate();
    const { startWorkout } = useWorkout();
    const program = useLiveQuery(
        async () => {
            if (!id) return null;
            const programExercises = await db.programExercises
                .where('programId')
                .equals(Number(id))
                .sortBy('order');

            const exercises = await Promise.all(
                programExercises.map(pe =>
                    db.exercises.get(pe.exerciseId)
                )
            );

            const programWithExercises = {
                ...(await db.programs.get(Number(id))),
                exercises: exercises.filter((e): e is Exercise => e !== undefined)
            };
            return programWithExercises;

        },
        [id]
    );

    const handleEdit = () => {
        if (!program) return;

        // Set program data for the form
        setProgram({
            id: program.id ?? 0,
            name: program.name ?? '',
            description: program.description ?? '',
            createdAt: program.createdAt ?? new Date(),
            updatedAt: program.updatedAt ?? new Date()
        });

        // Set selected exercises
        setSelectedExercises(program.exercises.map(e => e.id));

        setIsOpen(true);
    };

    const handleDelete = () => {
        if (!program) return;

        showConfirmDialog({
            title: "Delete Program",
            description: `Are you sure you want to delete "${program.name}"? This action cannot be undone.`,
            onConfirm: async () => {
                try {
                    // Delete program exercises first (foreign key constraint)
                    await db.programExercises
                        .where('programId')
                        .equals(program.id as number)
                        .delete();

                    // Then delete the program
                    await db.programs.delete(program.id as number);

                    // Navigate back to programs list
                    window.history.back();
                } catch (error) {
                    console.error("Error deleting program:", error);
                }
            },
        });
    };

    if (!program) {
        return <div>Loading program...</div>;
    }

    //todo: toggle edit program name and description and exercises


    return (
        <>
            <AppHeader title={'Programs'} variant='subpage' />
            <div className="container py-4">
                <div className="px-4 py-3 flex justify-between items-center">
                    <div className="">
                        <h2 className="text-lg font-medium">{program.name}</h2>
                        <div className="text-muted-foreground text-sm">
                            {program.description}
                        </div>

                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full" variant='ghost' size='icon'>
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleEdit}>
                                <Edit />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Separator />

                <ul>
                    {program.exercises.map(({ id, name }) => (
                        <li key={`exercise-${id}`} className=''>
                            <span className='block px-4 py-2'>{name}</span>
                            <Separator />
                        </li>
                    ))}
                </ul>
                <div className="p-4">
                    <Button
                        className="w-full"
                        onClick={() => {
                            startWorkout(program.id as number);
                            navigate(routePaths.workout);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Start Workout
                    </Button>
                </div>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <ProgramForm selectedExerciseIds={program.exercises.map(e => e.id)} />
            </Sheet>
        </>
    );
} 