import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import {Button} from "~/components/ui/button";
import { useWorkout } from "~/context/workout-context";

export default function WorkoutDeleteSetDialog({ exerciseId, setIndex }: { exerciseId: number, setIndex: number }) {
  const { deleteSet } = useWorkout();

  const handleDelete = async () => {
    try {
      await deleteSet(exerciseId, setIndex);
    } catch (error) {
      console.error("Error deleting set:", error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          recorded set.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className='flex flex-row justify-center space-x-4'>
        <DialogClose asChild>
          <Button variant='outline'>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant='destructive' onClick={handleDelete}>Delete</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
