import {Button} from "~/components/ui/button"
import {Input} from "~/components/ui/input"
import {Label} from "~/components/ui/label"

import {Textarea} from "~/components/ui/textarea";
import {SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle,} from "~/components/ui/sheet"

export function WorkoutSetForm() {
  return (
    <SheetContent side={"top"}>
      <SheetHeader>
        <SheetTitle>Add set</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 py-4">
        <div>
          <Label htmlFor="weight">
            Weight
          </Label>
          <Input id="weight" type='number'/>
        </div>
        <div>
          <Label htmlFor="reps">
            Reps
          </Label>
          <Input id="reps" type='number'/>
        </div>
        <div className="">
          <Label htmlFor="note">Note</Label>
          <Textarea placeholder="Write your notes or comments here." id="note"/>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}
