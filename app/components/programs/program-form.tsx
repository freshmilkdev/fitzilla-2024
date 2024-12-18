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

export function ProgramForm({ selectedExerciseIds }: { selectedExerciseIds?: number[] }) {
    return (
        <SelectedExercisesProvider>
            <ProgramFormContent selectedExerciseIds={selectedExerciseIds} />
        </SelectedExercisesProvider>
    );
}

export function ProgramFormContent({ selectedExerciseIds }: { selectedExerciseIds?: number[] }) {
    const { program, setIsOpen } = useProgramSheet();
    const { selectedExercises, setSelectedExercises, clearSelection } = useSelectedExercises();
    const [name, setName] = useState(program?.name ?? "");
    const [description, setDescription] = useState(program?.description ?? "");
    const groupedExercises = useGroupedExercises();

    // Handle form field values
    useEffect(() => {
        setName(program?.name ?? "");
        setDescription(program?.description ?? "");
    }, [program]);

    // Handle initial exercise selection
    useEffect(() => {
        if (selectedExerciseIds?.length) {
            setSelectedExercises(selectedExerciseIds);
        }
    }, []); // Run only once on mount

    const handleSubmit = async () => {
        if (!name) return;

        try {
            let programId: number;
            
            if (program?.id) {
                programId = program.id;
                await db.programs.update(programId, {
                    name,
                    description,
                    updatedAt: new Date()
                });
                // Delete existing program exercises
                await db.programExercises.where('programId').equals(programId).delete();
            } else {
                programId = await db.programs.add({
                    name,
                    description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            // Add selected exercises to program
            const programExercises = Array.from(selectedExercises).map((exerciseId, index) => ({
                programId,
                exerciseId,
                order: index,
                createdAt: new Date(),
                updatedAt: new Date()
            }));

            await db.programExercises.bulkAdd(programExercises);

            setName("");
            setDescription("");
            // clearSelection();
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

            <div className="grid gap-4 py-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Exercises</Label>
                    <MuscleGroupList 
                        groupedExercises={groupedExercises} 
                        variant="withCheckbox" 
                    />
                </div>
            </div>
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit" onClick={handleSubmit}>
                        <Save />
                        Save
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
} 