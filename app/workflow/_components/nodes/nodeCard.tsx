"use client";
import { useReactFlow } from "@xyflow/react";

import { cn } from "@/lib/utils";

interface NodeCardProps {
  children: React.ReactNode;
  nodeId: string;
  isSelected: boolean;
}
function NodeCard({ children, nodeId, isSelected }: NodeCardProps) {
  const { getNode, setCenter } = useReactFlow();

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);

        if (!node) return;
        const { position, measured } = node;
        if (!measured || !position) return;
        const { width, height } = measured;
        let { x, y } = position;
        x += width! / 2;
        y += height! / 2;
        if (x === undefined || y === undefined) return;
        setCenter(x, y, { zoom: 1, duration: 500 });
      }}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary"
      )}>
      {children}
    </div>
  );
}

export default NodeCard;
