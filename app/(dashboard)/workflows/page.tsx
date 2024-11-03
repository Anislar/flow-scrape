import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { AlertCircle, InboxIcon } from "lucide-react";
import DialogWorkflow from "./_components/dialogWorkflow";
import WorkflowCard from "./_components/workflowCard";

function WorkFlowsPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <h1 className="text-3xl font-bold"> Workflows</h1>
          <p className=" text-muted-foreground"> Manage your workflows</p>
        </div>
        <DialogWorkflow triggerText="Create a workflow" />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

const UserWorkflows = async () => {
  const workflows = await getWorkflowsForUser();
  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error fetching your workflows, please try again later!
        </AlertDescription>
      </Alert>
    );
  } else if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent size-20 flex items-center justify-center">
          <InboxIcon className=" stroke-primary" size={40} />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <p className="font-bold"> No Workflow created yet!</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Click the bottom bellow to create a new workflow
        </p>
        <DialogWorkflow triggerText="Create your first workflow" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};
export default WorkFlowsPage;
