import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "~/components/ui/sheet"
import { useWorkout } from "~/context/workout-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const setFormSchema = z.object({
  weight: z.number().min(0, "Weight must be 0 or greater"),
  reps: z.number().min(1, "Must do at least 1 rep"),
  notes: z.string().optional()
});

type SetFormValues = z.infer<typeof setFormSchema>;

export function WorkoutSetForm({ exerciseId }: { exerciseId: number }) {
  const { addSet } = useWorkout();

  const form = useForm<SetFormValues>({
    resolver: zodResolver(setFormSchema),
    defaultValues: {
      weight: 0,
      reps: 0,
      notes: ""
    }
  });

  const onSubmit = async (data: SetFormValues) => {
    await addSet(exerciseId);
    form.reset();
  };

  return (
    <SheetContent side="top">
      <SheetHeader>
        <SheetTitle>Add set</SheetTitle>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reps</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
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
                  <Textarea {...field} placeholder="Write your notes or comments here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save Set</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
