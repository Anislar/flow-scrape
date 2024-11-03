import { FlowToExecutionPlan } from "@/lib/workflow/flowExecutionPlan";
import { IAppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { FlowExecutionPlanValidationError } from "@/types/workflow";
import { toast } from "sonner";

function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowExecutionPlanValidationError.INVALID_INPUT:
          toast.error("Not All inputs values are set");
          setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error("An error occurred while generating the execution plan");
          break;
      }
    },
    [setInvalidInputs]
  );
  const generationExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as IAppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }
    clearErrors();
    return executionPlan;
  }, [toObject, clearErrors, handleError]);
  return generationExecutionPlan;
}

export default useExecutionPlan;
