import { ProgramList } from "./program-list";
import { AppHeader } from "../layout/app-header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ProgramSheetProvider, useProgramSheet } from "../../context/program-sheet-context";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { ProgramForm } from "./program-form";
import { DialogProvider } from "~/context/dialog-context";
import { Fab } from "../ui/fab";

function ProgramsContent() {
  const { isOpen, setIsOpen, setProgram } = useProgramSheet();

  const handleAddProgram = () => {
    setProgram(null);
    setIsOpen(true);
  };

  return (
    <>
      <AppHeader title="Programs" />
      <div className="container pb-20">
        <ProgramList />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <Fab onClick={handleAddProgram} />
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