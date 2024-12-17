import * as React from "react"
import type { Exercise } from "~/types"

interface ExerciseSheetContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  exercise: Exercise | null
  setExercise: (exercise: Exercise | null) => void
}

export const ExerciseSheetContext = React.createContext<ExerciseSheetContextType | undefined>(undefined)

export function ExerciseSheetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [exercise, setExercise] = React.useState<Exercise | null>(null)

  const value = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    exercise,
    setExercise
  }), [isOpen, exercise])

  return (
    <ExerciseSheetContext.Provider value={value}>
      {children}
    </ExerciseSheetContext.Provider>
  )
}

export function useExerciseSheet() {
  const context = React.useContext(ExerciseSheetContext)
  if (context === undefined) {
    throw new Error('useExerciseSheet must be used within a ExerciseSheetProvider')
  }
  return context
} 