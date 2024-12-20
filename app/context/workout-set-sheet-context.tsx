import * as React from "react";
import type { WorkoutSet } from "~/types";

interface WorkoutSetSheetContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  exerciseId: number | null;
  setExerciseId: (id: number | null) => void;
  isBodyweight: boolean;
  setIsBodyweight: (isBodyweight: boolean) => void;
  set: WorkoutSet | null;
  setSet: (set: WorkoutSet | null) => void;
  setIndex: number | undefined;
  setSetIndex: (index: number | undefined) => void;
}

const WorkoutSetSheetContext = React.createContext<WorkoutSetSheetContextType | undefined>(undefined);

export function WorkoutSetSheetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [exerciseId, setExerciseId] = React.useState<number | null>(null);
  const [isBodyweight, setIsBodyweight] = React.useState(false);
  const [set, setSet] = React.useState<WorkoutSet | null>(null);
  const [setIndex, setSetIndex] = React.useState<number | undefined>(undefined);

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      exerciseId,
      setExerciseId,
      isBodyweight,
      setIsBodyweight,
      set,
      setSet,
      setIndex,
      setSetIndex,
    }),
    [isOpen, exerciseId, isBodyweight, set, setIndex]
  );

  return (
    <WorkoutSetSheetContext.Provider value={value}>
      {children}
    </WorkoutSetSheetContext.Provider>
  );
}

export function useWorkoutSetSheet() {
  const context = React.useContext(WorkoutSetSheetContext);
  if (context === undefined) {
    throw new Error('useWorkoutSetSheet must be used within a WorkoutSetSheetProvider');
  }
  return context;
} 