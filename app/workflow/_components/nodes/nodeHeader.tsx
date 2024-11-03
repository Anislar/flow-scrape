"use client";

import TooltipWrapper from "@/components/tooltipwrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createFlowNode } from "@/lib/workflow/createFlowNode";

import { TaskRegistry } from "@/lib/workflow/task/registry";
import { IAppNode } from "@/types/appNode";
import { TaskType } from "@/types/taskType";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";

function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge> Entry point</Badge>}

          <Badge className="gap-2 flex  items-center text-xs">
            <CoinsIcon size={16} />
            {task.credits}
          </Badge>
          {!task.isEntryPoint && (
            <>
              <TooltipWrapper content="Delete">
                <Button
                  onClick={() => {
                    deleteElements({
                      nodes: [{ id: nodeId }],
                    });
                  }}
                  variant="ghost"
                  size="icon">
                  <TrashIcon size={12} />
                </Button>
              </TooltipWrapper>
              <TooltipWrapper content="Duplicate">
                <Button
                  onClick={() => {
                    const node = getNode(nodeId) as IAppNode;
                    const newX = node.position.x;
                    const newY = node.position.y + node.measured?.height! + 20;
                    const newNode = createFlowNode(node.data.type, {
                      x: newX,
                      y: newY,
                    });
                    addNodes([newNode]);
                  }}
                  variant="ghost"
                  size="icon">
                  <CopyIcon size={12} />
                </Button>
              </TooltipWrapper>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className=" drag-handle  cursor-grab ">
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
