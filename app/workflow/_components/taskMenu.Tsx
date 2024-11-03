"use client";

import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/taskType";
import { DragEvent } from "react";
function TaskMenu() {
  return (
    <aside
      style={{
        width: "340px",
      }}
      className="  border-r-2 border-separate h-full p-2  px-2 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full "
        defaultValue={["extraction"]}>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuButton taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default TaskMenu;

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  const onDragStart = (e: DragEvent<HTMLButtonElement>, type: TaskType) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      onDragStart={(e) => {
        onDragStart(e, taskType);
      }}
      draggable
      variant="secondary"
      className="flex justify-between items-center gap-2 border w-full">
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
}
