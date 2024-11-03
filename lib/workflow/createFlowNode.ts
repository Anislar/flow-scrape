import { IAppNode } from "@/types/appNode";
import { TaskType } from "@/types/taskType";

export function createFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): IAppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position || { x: 0, y: 0 },
  };
}
