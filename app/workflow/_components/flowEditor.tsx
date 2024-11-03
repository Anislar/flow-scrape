import { useCallback, useEffect } from "react";
import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { Workflow } from "@prisma/client";
import NodeComponent from "./nodes/nodeComponent";
import { TaskType } from "@/types/taskType";
import { IAppNode } from "@/types/appNode";

import "@xyflow/react/dist/style.css";
import DeleteEdgeButton from "./edges/deleteEdgeButton";
const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};
const edgeTypes = {
  default: DeleteEdgeButton,
};
const snapGrid: [number, number] = [50, 50];
const fitViewOptions = {
  padding: 1,
};

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<IAppNode>([
    createFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      //  in case we want to restore the viewport
      //  comment : fitView
      if (!flow.viewport) return;
      //  const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      //setViewport({ x, y, zoom });
    } catch (error) {}

    return () => {};
  }, [workflow?.definition, setEdges, setNodes]);
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (taskType === undefined || !taskType) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = createFlowNode(taskType as TaskType, position);
      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((prev) => addEdge({ ...connection, animated: true }, prev));
    },
    [setEdges]
  );
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}>
        <Controls
          position="top-left"
          showFitView
          fitViewOptions={fitViewOptions}
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
