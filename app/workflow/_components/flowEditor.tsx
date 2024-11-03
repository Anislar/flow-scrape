import { useCallback, useEffect } from "react";
import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  addEdge,
  getOutgoers,
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
import { updateWorkflow } from "@/actions/workflows/updateWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
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
  const [nodes, setNodes, onNodesChange] = useNodesState<IAppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition, updateNodeData } = useReactFlow();
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
      if (!connection.targetHandle) return;
      // remove input value if is present on connection
      const node = nodes.find((n) => n.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;
      if (!nodeInputs) return;
      delete nodeInputs[connection.targetHandle];
      updateNodeData(node.id, {
        inputs: nodeInputs,
      });
    },
    [nodes, setEdges, updateNodeData]
  );
  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self connections allowed
      if (connection.source === connection.target) return false;
      //Check if source and target nodes are present
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      if (!sourceNode || !targetNode) return false;

      const sourceTask = TaskRegistry[sourceNode.data.type];
      const targetTask = TaskRegistry[targetNode.data.type];
      const output = sourceTask.outputs?.find(
        (out) => out.name === connection.sourceHandle
      );
      const input = targetTask.inputs?.find(
        (inp) => inp.name === connection.targetHandle
      );

      //same taskParam type connection
      if (input?.type !== output?.type) return false;

      const hasCycle = (node: IAppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
      const detectedCycle = hasCycle(targetNode);
      return !detectedCycle;
    },
    [edges, nodes]
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
        onConnect={onConnect}
        isValidConnection={isValidConnection}>
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
