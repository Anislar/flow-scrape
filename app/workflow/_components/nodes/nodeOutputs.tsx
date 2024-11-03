"use client";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/taskType";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./common";

function NodeOutputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

export default NodeOutputs;

export const NodeOutputItem = ({ output }: { output: TaskParam }) => {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        type="source"
        position={Position.Right}
        id={output.name}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background  !-right-2 !size-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
};
