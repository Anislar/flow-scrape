"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { deleteWorkflows } from "@/actions/workflows/deleteWorkflows";
import { toast } from "sonner";

interface DeleteWorkflowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowID: string;
}
function DeleteWorkflow({
  open,
  setOpen,
  workflowName,
  workflowID,
}: DeleteWorkflowProps) {
  const [confirmText, setConfirmText] = useState("");
  const deleteMutation = useMutation({
    mutationFn: deleteWorkflows,
    onSuccess: () => {
      toast.success("Workflow deleted", {
        id: `workflow-deleted-${workflowID}`,
      });
      setConfirmText("");
    },
    onError: () => {
      toast.error("Failed to delete workflow", {
        id: `workflow-deleted-${workflowID}`,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            If You delete this workflow, it will be gone forever.
            <div className="flex flex-col py-4 gap-2">
              <p className="text-sm text-muted-foreground">
                If you are sure, enter <b> {workflowName}</b> to confirm:
              </p>
              <Input
                onPaste={(e) => e.preventDefault()}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={() => {
              toast.loading("Deleting workflow...", {
                id: `workflow-deleted-${workflowID}`,
              });
              deleteMutation.mutate(workflowID);
            }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflow;
