import {Button} from "~/components/ui/button"
import {Input} from "~/components/ui/input"
import {Label} from "~/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import {Plus} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import {Switch} from "~/components/ui/switch";

export function ExerciseForm() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={'fixed mx-auto left-1/2 transform -translate-x-1/2 bottom-20 rounded-full h-14 w-14'}>
          <Plus className={'!w-8 !h-8'}/>
        </Button>
      </SheetTrigger>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>Add exercise</SheetTitle>
          <SheetDescription>
            Make changes to the exercise.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="exercise">
              Exercise
            </Label>
            <Input id="exercise"/>
          </div>
          <div>
            <Label htmlFor="muscle-group">Muscle group</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label htmlFor="bodyweight">Bodyweight</Label>
            <Switch id="bodyweight" className='block'/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
