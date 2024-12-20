import { ProgramList } from "./program-list";
import { AppHeader } from "../layout/app-header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ProgramSheetProvider, useProgramSheet } from "../../context/program-sheet-context";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { ProgramForm } from "./program-form";
import { DialogProvider } from "~/context/dialog-context";

function ProgramsContent() {
  const { isOpen, setIsOpen, setProgram } = useProgramSheet();

  return (
    <>
      <AppHeader title="Programs" />
      <div className="container pb-20">
        <ProgramList />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className={'fixed mx-auto left-1/2 transform -translate-x-1/2 bottom-20 rounded-full h-14 w-14'}
              onClick={() => setProgram(null)}
            >
              <Plus className={'!w-8 !h-8'} />
            </Button>
          </SheetTrigger>
          <ProgramForm />
        </Sheet>
      </div>
    </>
  )
}

export default function Programs() {
  return (
    <ProgramSheetProvider>
      <DialogProvider>
        <ProgramsContent />
      </DialogProvider>
    </ProgramSheetProvider>
  )
}