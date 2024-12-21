import { useLiveQuery } from "dexie-react-hooks";

import { db } from "~/db";
import { PageHeader } from "../layout/page-header";
import { Separator } from "../ui/separator";
import type { Exercise, Program } from "~/types";
import { Button } from "../ui/button";
import { Pencil, Plus, History, Edit, Trash2, Ellipsis, SquareArrowOutUpRight, CirclePlay } from "lucide-react";
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
import { ContentHeader } from "../layout/content-header";

export default function Program({
    id,
}: {
    id: string | null;
}) {
    const { isOpen, setIsOpen, setProgram } = useProgramSheet();
    const { setSelectedExercises } = useSelectedExercises();
    const { showConfirmDialog } = useDialog();
    const navigate = useNavigate();
    const { startWorkout, deleteWorkout, currentWorkout } = useWorkout();

    const program = useLiveQuery(
        async () => {
            if (!id) return null;
            const programExercises = await db.programExercises
                .where('programId')
                .equals(Number(id))
                .sortBy('order');

            const exercises = await Promise.all(
                programExercises.map(pe =>
                           //TODO: refactor this to fetch the alexercises once
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


    const isCurrentWorkout = currentWorkout?.programId === program?.id;
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
                    navigate(routePaths.programs);
                } catch (error) {
                    console.error("Error deleting program:", error);
                }
            },
        });
    };

    const handleStartWorkout = () => {
        if (currentWorkout) {
            if (isCurrentWorkout) {
                navigate(routePaths.workout);
                return;
            }
            showConfirmDialog({
                title: "Active Workout Exists",
                description: "You already have an active workout. Would you like to abandon it and start a new one?",
                onConfirm: async () => {
                    await deleteWorkout();
                    await startWorkout(program?.id as number);
                    navigate(routePaths.workout);
                },
            });
            return;
        }

        startWorkout(program?.id as number);
        navigate(routePaths.workout);
    };

    if (!program) {
        return <div>Loading program...</div>;
    }


    return (
        <>
            <AppHeader title={'Programs'} variant='subpage' />
            <div className="container pb-4">
                <ContentHeader 
                    title={program.name ?? ''} 
                    description={program.description}
                >
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
                </ContentHeader>
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
                        onClick={handleStartWorkout}
                    >
                        {isCurrentWorkout ? <SquareArrowOutUpRight className="mr-2 !h-5 !w-5" /> :
                         <CirclePlay className="mr-2 !h-5 !w-5" />}
                        {isCurrentWorkout ? 'Switch to this Workout' : 'Start Workout'}
                    </Button>
                </div>
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <ProgramForm selectedExerciseIds={program.exercises.map(e => e.id)} />
            </Sheet>
        </>
    );
} 