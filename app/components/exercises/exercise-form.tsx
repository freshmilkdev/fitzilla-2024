import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { db } from "~/db";
import type { Exercise } from "~/types";

interface ExerciseFormProps {
  exercise?: Exercise;
  onClose?: () => void;
}

export function ExerciseForm({ exercise, onClose }: ExerciseFormProps) {
  const [name, setName] = useState(exercise?.name ?? "");
  const [muscleGroupId, setMuscleGroupId] = useState<number | undefined>(exercise?.muscleGroupId);
  const [isBodyweight, setIsBodyweight] = useState(false);

  // Reset form when exercise prop changes
  useEffect(() => {
    setName(exercise?.name ?? "");
    setMuscleGroupId(exercise?.muscleGroupId);
  }, [exercise]);

  // Fetch muscle groups for select dropdown
  const muscleGroups = useLiveQuery(
    () => db.muscleGroups.toArray()
  );

  const handleSubmit = async () => {
    if (!name || !muscleGroupId) return;

    try {
      if (exercise?.id) {
        // Update existing exercise
        await db.exercises.update(exercise.id, {
          name,
          muscleGroupId,
          updatedAt: new Date()
        });
      } else {
        // Create new exercise
        await db.exercises.add({
          name,
          muscleGroupId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // Reset form and close sheet
      setName("");
      setMuscleGroupId(undefined);
      setIsBodyweight(false);
      onClose?.();
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  return (
    <SheetContent side={"top"}>
      <SheetHeader>
        <SheetTitle>{exercise ? 'Edit exercise' : 'Add exercise'}</SheetTitle>
        <SheetDescription>
          {exercise ? 'Make changes to the exercise.' : 'Add a new exercise.'}
        </SheetDescription>
      </SheetHeader>

      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="exercise">Exercise</Label>
          <Input 
            id="exercise" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="muscle-group">Muscle group</Label>
          <Select 
            value={muscleGroupId?.toString()} 
            onValueChange={(value) => setMuscleGroupId(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a muscle group"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Muscle Groups</SelectLabel>
                {muscleGroups?.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bodyweight">Bodyweight</Label>
          <Switch 
            id="bodyweight" 
            className='block'
            checked={isBodyweight}
            onCheckedChange={setIsBodyweight}
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" onClick={handleSubmit}>
            {exercise ? 'Save changes' : 'Add exercise'}
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
