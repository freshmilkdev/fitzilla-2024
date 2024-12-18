import * as React from "react"

interface SelectedExercisesContextType {
  selectedExercises: Set<number>;
  toggleExercise: (exerciseId: number) => void;
  clearSelection: () => void;
}

export const SelectedExercisesContext = React.createContext<SelectedExercisesContextType | undefined>(undefined)

export function SelectedExercisesProvider({ children }: { children: React.ReactNode }) {
  const [selectedExercises, setSelectedExercises] = React.useState<Set<number>>(new Set());

  const toggleExercise = React.useCallback((exerciseId: number) => {
    setSelectedExercises(prev => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
      } else {
        next.add(exerciseId);
      }
      return next;
    });
  }, []);

  const clearSelection = React.useCallback(() => {
    setSelectedExercises(new Set());
  }, []);

  const value = React.useMemo(() => ({
    selectedExercises,
    toggleExercise,
    clearSelection
  }), [selectedExercises, toggleExercise, clearSelection]);

  return (
    <SelectedExercisesContext.Provider value={value}>
      {children}
    </SelectedExercisesContext.Provider>
  );
}

export function useSelectedExercises() {
  const context = React.useContext(SelectedExercisesContext)
  if (context === undefined) {
    throw new Error('useSelectedExercises must be used within a SelectedExercisesProvider')
  }
  return context
} 