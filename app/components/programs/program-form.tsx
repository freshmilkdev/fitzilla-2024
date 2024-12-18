import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import { Textarea } from "../ui/textarea"
import { useProgramSheet } from "../../context/program-sheet-context"
import { useState, useEffect } from "react"
import { db } from "~/db"
import { useGroupedExercises } from "~/hooks/use-grouped-exercises"
import { MuscleGroupList } from "../exercises/muscle-group-list"
import { Save } from "lucide-react"
import { SelectedExercisesProvider, useSelectedExercises } from "../../context/selected-exercises-context"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

const programFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  exercises: z.array(z.number()).min(1, "Select at least one exercise")
});

type ProgramFormValues = z.infer<typeof programFormSchema>;

export function ProgramForm({ selectedExerciseIds }: { selectedExerciseIds?: number[] }) {
    return (
        <SelectedExercisesProvider>
            <ProgramFormContent selectedExerciseIds={selectedExerciseIds} />
        </SelectedExercisesProvider>
    );
}

export function ProgramFormContent({ selectedExerciseIds }: { selectedExerciseIds?: number[] }) {
    const { program, setIsOpen } = useProgramSheet();
    const { selectedExercises, setSelectedExercises } = useSelectedExercises();
    const groupedExercises = useGroupedExercises();

    const form = useForm<ProgramFormValues>({
        resolver: zodResolver(programFormSchema),
        defaultValues: {
            name: "",
            description: "",
            exercises: []
        }
    });

    // Handle initialization for both new and edit cases
    useEffect(() => {
        if (program) {
            // Edit case
            form.reset({
                name: program.name,
                description: program.description ?? "",
                exercises: selectedExerciseIds ?? []
            });
            setSelectedExercises(selectedExerciseIds ?? []);
        } else {
            // New case
            form.reset({
                name: "",
                description: "",
                exercises: []
            });
            setSelectedExercises([]);
        }
    }, [program, selectedExerciseIds]);

    // Sync form with selected exercises
    useEffect(() => {
        const exercises = Array.from(selectedExercises);
        form.setValue("exercises", exercises);
        // Trigger validation immediately after setting value
        if (form.formState.isSubmitted) {
            form.trigger("exercises");
        }
    }, [selectedExercises, form]);

    const onSubmit = async (data: ProgramFormValues) => {
        try {
            let programId: number;
            
            if (program?.id) {
                programId = program.id;
                await db.programs.update(programId, {
                    name: data.name,
                    description: data.description,
                    updatedAt: new Date()
                });
                await db.programExercises.where('programId').equals(programId).delete();
            } else {
                programId = await db.programs.add({
                    name: data.name,
                    description: data.description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            const programExercises = Array.from(selectedExercises).map((exerciseId, index) => ({
                programId,
                exerciseId,
                order: index,
                createdAt: new Date(),
                updatedAt: new Date()
            }));

            await db.programExercises.bulkAdd(programExercises);
            form.reset();
            setSelectedExercises([]);
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving program:", error);
        }
    };

    return (
        <SheetContent side={"top"} className="px-4">
            <SheetHeader>
                <SheetTitle>{program ? 'Edit program' : 'Add program'}</SheetTitle>
                <SheetDescription>
                    {program ? 'Save changes.' : ''}
                </SheetDescription>
            </SheetHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="exercises"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Exercises</FormLabel>
                                <FormControl>
                                    <MuscleGroupList 
                                        groupedExercises={groupedExercises} 
                                        variant="withCheckbox" 
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <FormMessage>
                                        {fieldState.error.message}
                                    </FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <SheetFooter>
                        <Button type="submit">
                            <Save className="mr-2" />
                            Save
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    )
} 