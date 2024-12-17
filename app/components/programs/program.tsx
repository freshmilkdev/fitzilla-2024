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

export default function Program({
    id,
}: {
    id: string | null;
}) {


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

    if (!program) {
        return <div>Loading program...</div>;
    }

    //todo: toggle edit program name and description and exercises
    //todo: add exercise to program logic
    //todo: add exercises list without accordion for this view

    return (
        <>
            <AppHeader title={'Programs'} variant='subpage' />
            <div className="container py-4">
                <div className="flex justify-between items-center pr-4">
                    <PageHeader title={program.name ?? ''} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full" variant='ghost' size='icon'>
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <History />
                                <span>History</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Edit />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Trash2 />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="text-muted-foreground text-sm mb-4 px-4">
                    {program.description}
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
                        onClick={() => {/* Add exercise to program logic */ }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Start Workout
                    </Button>
                </div>
            </div>
        </>
    );
} 