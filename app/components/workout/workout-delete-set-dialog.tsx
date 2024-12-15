import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import {Button} from "~/components/ui/button";

export default function WorkoutDeleteSetDialog() {
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
          <Button variant='outline'>Back</Button>
        </DialogClose>
        <Button variant='destructive'>Continue</Button>
      </DialogFooter>
    </DialogContent>

  )
}
