"use client";
import TooltipWrapper from "@/components/tooltipwrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveButton from "./saveButton";
import ExecuteButton from "./executeButton";

interface TopbarProps {
  title: string;
  subtitle?: string;
  workflowId: string;
}
function Topbar({ title, subtitle, workflowId }: TopbarProps) {
  const router = useRouter();

  return (
    <header
      className="flex border-b-2 justify-between p-2 border-separate 
    w-full sticky h-[60px] top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title} </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <ExecuteButton workflowId={workflowId} />
        <SaveButton workflowId={workflowId} />
      </div>
    </header>
  );
}

export default Topbar;
