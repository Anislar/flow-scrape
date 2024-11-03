import { Handle, Position, useEdges } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/taskType";
import NodeParamField from "./nodeParamField";
import { ColorForHandle } from "./common";

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
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
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
