import { Handle, Position, useEdges } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/taskType";
import NodeParamField from "./nodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/components/hooks/useFlowValidation";

function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col divide-y gap-2"> {children} </div>;
}

export default NodeInputs;

export function NodeInputItem({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  const edges = useEdges();
  const isConnected: boolean = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );
  const { invalidInputs } = useFlowValidation();
  const hasError = invalidInputs
    .find((input) => input.nodeId === nodeId)
    ?.inputs?.find((i) => i === input.name);
  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasError && " bg-destructive/30 "
      )}>
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          isConnectable={!isConnected}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !size-4",

            ColorForHandle[input.type]
          )}
          id={input.name}
          type="target"
          position={Position.Left}
        />
      )}
    </div>
  );
}
