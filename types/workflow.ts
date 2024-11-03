import { LucideProps } from "lucide-react";
import { TaskParam, TaskType } from "./taskType";
import { IAppNode } from "./appNode";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};

export type ExecutionWorkflowPlanPhase = {
  phase: number;
  nodes: IAppNode[];
};
export type ExecutionWorkflowPlan = ExecutionWorkflowPlanPhase[];

export enum FlowExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUT",
}
