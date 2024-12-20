import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import { useWorkout } from "~/context/workout-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from "react";

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

export function WorkoutSetForm({ 
  exerciseId, 
  isBodyweight,
  onOpenChange
}: { 
  exerciseId: number, 
  isBodyweight: boolean,
  onOpenChange: (open: boolean) => void
}) {
  const { addSet } = useWorkout();

  const form = useForm<z.infer<ReturnType<typeof setFormSchema>>>({
    resolver: zodResolver(setFormSchema(isBodyweight)),
    defaultValues: {
      reps: undefined,
      weight: undefined,
      notes: ""
    }
  });

  async function onSubmit(data: z.infer<ReturnType<typeof setFormSchema>>) {
    try {
      await addSet(exerciseId, {
        weight: data.weight,
        reps: data.reps,
        notes: data.notes || ''
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding set:", error);
    }
  }

  return (
    <SheetContent side="top">
      <SheetHeader>
        <SheetTitle>Add set</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          {!isBodyweight && (
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                      value={field.value ?? ""}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
                    value={field.value ?? ""}
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
            <Button type="submit">Save Set</Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
