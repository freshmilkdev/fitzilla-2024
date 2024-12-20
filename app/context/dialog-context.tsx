import * as React from "react";
import { ConfirmDialog } from "../components/ui/confirm-dialog";

interface DialogContextType {
  showConfirmDialog: (options: {
    title: string;
    description: string;
    onConfirm: () => Promise<void> | void;
  }) => void;
  hideConfirmDialog: () => void;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

export function DialogProvider({ children, actionText }: { children: React.ReactNode, actionText?: string }) {
  const [dialogState, setDialogState] = React.useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: (() => Promise<void> | void) | null;
    actionText?: string;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: null,
    actionText: 'Delete',
  });

  const showConfirmDialog: DialogContextType["showConfirmDialog"] = (options) => {
    setDialogState({
      isOpen: true,
      ...options,
    });
  };

  const hideConfirmDialog = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <DialogContext.Provider value={{ showConfirmDialog, hideConfirmDialog }}>
      {children}
      <ConfirmDialog
        actionText={actionText}
        open={dialogState.isOpen}
        onOpenChange={(open) => !open && hideConfirmDialog()}
        title={dialogState.title}
        description={dialogState.description}
        onConfirm={async () => {
          if (dialogState.onConfirm) {
            await dialogState.onConfirm();
            hideConfirmDialog();
          }
        }}
      />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
} 