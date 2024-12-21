import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import { useWorkout } from "~/context/workout-context";
import { useWorkoutSetSheet } from "~/context/workout-set-sheet-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useEffect, useState } from "react";
import { Check, Save } from "lucide-react";
import { useTheme } from "~/context/theme-context";

const setFormSchema = (isBodyweight: boolean) => z.object({
  weight: isBodyweight
    ? z.number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number"
    }).optional()
    : z.number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number"
    }).min(0, "Weight must be 0 or greater"),
  reps: z.number({
    required_error: "Reps are required",
    invalid_type_error: "Reps must be a number"
  }).min(1, "Must do at least 1 rep"),
  notes: z.string().optional()
});

export function WorkoutSetSheetContent() {  
  const { settings } = useTheme();
  const { isOpen, setIsOpen, exerciseId, isBodyweight, set, setIndex } = useWorkoutSetSheet();
  const { addSet, updateSet } = useWorkout();

  const form = useForm<z.infer<ReturnType<typeof setFormSchema>>>({
    resolver: zodResolver(setFormSchema(isBodyweight)),
    defaultValues: {
      reps: set?.reps ?? undefined,
      weight: set?.weight ?? undefined,
      notes: set?.notes ?? ""
    }
  });
  useEffect(() => {
    const defaultValues = {
      reps: undefined,
      weight: undefined,
      notes: ""
    };

    const values = set 
      ? { ...set, notes: set.notes || "" }
      : defaultValues;

    form.reset(values);
  }, [set, form]);

  async function onSubmit(data: z.infer<ReturnType<typeof setFormSchema>>) {
    if (!exerciseId) return;

    try {
      if (setIndex !== undefined) {
        await updateSet(exerciseId, setIndex, data);
      } else {
        await addSet(exerciseId, data);
      }
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving set:", error);
    }
  }

  return (
   
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>{set ? 'Edit set' : 'Add set'}</SheetTitle>
          <SheetDescription>{set && setIndex !== undefined ? `Set ${setIndex + 1}` : 'Add a set to the exercise'}</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {!isBodyweight && (
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight ({settings?.measurementUnit})</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter weight"
                        {...field}
                        value={field.value ?? ""}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter reps"
                      {...field}
                      value={field.value || ""}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your notes or comments here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">
                <Check />
                Save
                </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
  );
}

export { WorkoutSetSheetContent as WorkoutSetForm }
