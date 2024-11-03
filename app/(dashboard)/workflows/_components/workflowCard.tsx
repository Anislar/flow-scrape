"use client";
import Link from "next/link";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Workflow } from "@prisma/client";
import { WorkflowStatus } from "@/types/workflow";
import { cn } from "@/lib/utils";
import TooltipWrapper from "@/components/tooltipwrapper";
import { useState } from "react";
import DeleteWorkflow from "./deleteWorkflow";

interface WorkflowCardProps {
  workflow: Workflow;
}
const statusColor = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};
function WorkflowCard({ workflow }: WorkflowCardProps) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card
      className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow:md
    dark:shadow-primary/30">
      <CardContent className=" p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "size-10 rounded-full flex items-center justify-center",
              statusColor[workflow.status as WorkflowStatus]
            )}>
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 text-white" />
            )}
          </div>
          <div>
            <h3 className=" text-base font-bold text-muted-foreground  flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline">
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="text-xs ml-2 px-2 py-0.5 font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className=" flex items-center space-x-2 ">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "flex items-center gap-2"
            )}>
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions
            workflowName={workflow.name}
            workflowID={workflow.id}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowActions({
  workflowName,
  workflowID,
}: {
  workflowName: string;
  workflowID: string;
}) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <DeleteWorkflow
        workflowName={workflowName}
        workflowID={workflowID}
        open={showDialog}
        setOpen={setShowDialog}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More options">
              <div className="flex items-center justify-center w-full h-full px-1">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setShowDialog((p) => !p);
            }}
            className=" cursor-pointer text-destructive flex items-center gap-2">
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default WorkflowCard;