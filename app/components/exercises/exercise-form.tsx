import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useExerciseSheet } from "../../context/exercise-sheet-context";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Save } from "lucide-react";
import { db } from "~/db";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { useMuscleGroups } from "~/hooks/use-muscle-groups";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

const exerciseFormSchema = z.object({
  name: z.string().min(1, "Write an exercise name"),
  muscleGroupId: z.string().min(1, "Select a muscle group"),
  description: z.string().optional(),
  isBodyweight: z.boolean().default(false)
});

type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

export function ExerciseForm() {
  const { exercise, setIsOpen } = useExerciseSheet();
  const muscleGroups = useMuscleGroups();

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      muscleGroupId: "",
      isBodyweight: false
    }
  });

  // Set initial values when editing
  useEffect(() => {
    if (exercise) {
      form.reset({
        name: exercise.name,
        description: exercise.description ?? "",
        muscleGroupId: exercise.muscleGroupId.toString(),
        isBodyweight: exercise.isBodyweight
      });
    }
  }, [exercise, form]);

  const onSubmit = async (data: ExerciseFormValues) => {
    try {
      if (exercise?.id) {
        await db.exercises.update(exercise.id, {
          name: data.name,
          description: data.description,
          muscleGroupId: Number(data.muscleGroupId),
          isBodyweight: data.isBodyweight,
          updatedAt: new Date()
        });
      } else {
        await db.exercises.add({
          name: data.name,
          description: data.description,
          muscleGroupId: Number(data.muscleGroupId),
          isBodyweight: data.isBodyweight,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  return (
    <SheetContent side={"bottom"} className="px-4 overflow-y-auto h-[92vh] pb-20">
      <SheetHeader>
        <SheetTitle>{exercise ? 'Edit exercise' : 'Add exercise'}</SheetTitle>
        <SheetDescription>
          {exercise ? 'Make changes to your exercise.' : 'Add a new exercise to your collection.'}
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
            name="muscleGroupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Muscle Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a muscle group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {muscleGroups?.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            name="isBodyweight"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Bodyweight Exercise</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    className="!mt-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <SheetFooter>
            <Button type="submit" className="fixed bottom-4 left-0 right-0 mx-4">
              <Check className="mr-2" />
              Save
            </Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
