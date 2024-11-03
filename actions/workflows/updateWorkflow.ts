"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { revalidatePath } from "next/cache";

export async function updateWorkflow({
  workflowId,
  definition,
}: {
  workflowId: string;
  definition: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }
  // Update workflow
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });
  if (!workflow) {
    throw new Error("Workflow not found");
  }
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Cannot update a published workflow");
  }
  await prisma.workflow.update({
    where: {
      id: workflowId,
      userId,
    },
    data: {
      definition,
    },
  });
  revalidatePath("/workflows");
}
