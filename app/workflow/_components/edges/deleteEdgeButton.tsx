"use client";

import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import React from "react";

function DeleteEdgeButton(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}>
          <Button
            variant="outline"
            size="icon"
            className=" size-5 border  rounded-full text-xs  leading-none hover:shadow-lg cursor-pointer"
            onClick={() => {
              setEdges((prev) => prev.filter((edge) => edge.id !== props.id));
            }}>
            x
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default DeleteEdgeButton;
