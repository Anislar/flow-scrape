"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { Node, Edge } from "@xyflow/react";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/taskType";
export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error("Invalid form data");
  }
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }
  // initial workflow data
  const initalWorkflow: { nodes: Node[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  // Add the flow entry point
  initalWorkflow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
  // Create workflow
  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initalWorkflow),
      ...data,
    },
  });
  if (!result) {
    throw new Error("Failed to create workflow!");
  }
  redirect(`/workflow/editor/${result.id}`);
}
