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

export function ProgramForm() {
    const { program, setIsOpen } = useProgramSheet();
    const [name, setName] = useState(program?.name ?? "");
    const [description, setDescription] = useState(program?.description ?? "");
    const groupedExercises = useGroupedExercises();

    useEffect(() => {
        setName(program?.name ?? "");
        setDescription(program?.description ?? "");
    }, [program]);

    const handleSubmit = async () => {
        if (!name) return;

        try {
            if (program?.id) {
                await db.programs.update(program.id, {
                    name,
                    description,
                    updatedAt: new Date()
                });
            } else {
                await db.programs.add({
                    name,
                    description,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            setName("");
            setDescription("");
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