"use client";
import { ReactFlowProvider } from "@xyflow/react";

import { Workflow } from "@prisma/client";
import FlowEditor from "./flowEditor";
import Topbar from "./topbar/topbar";
import TaskMenu from "./taskMenu";
function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full  overflow-hidden w-full">
        <Topbar
          title="Workflow editor"
          subtitle={workflow.name}
          workflowId={workflow.id}
        />
        <section className="flex overflow-auto h-full ">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
