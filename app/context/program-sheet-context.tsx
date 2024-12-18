import * as React from "react"
import type { Program } from "~/types"

interface ProgramSheetContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  program: Program | null
  setProgram: (program: Program | null) => void
}

export const ProgramSheetContext = React.createContext<ProgramSheetContextType | undefined>(undefined)

export function ProgramSheetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [program, setProgram] = React.useState<Program | null>(null)

  const value = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    program,
    setProgram
  }), [isOpen, program])

  return (
    <ProgramSheetContext.Provider value={value}>
      {children}
    </ProgramSheetContext.Provider>
  )
}

export function useProgramSheet() {
  const context = React.useContext(ProgramSheetContext)
  if (context === undefined) {
    throw new Error('useProgramSheet must be used within a ProgramSheetProvider')
  }
  return context
} 