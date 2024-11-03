"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteWorkflows(id: string) {
  if (!id) {
    throw new Error("Invalid id");
  }
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/workflows");
}