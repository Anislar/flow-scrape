"use client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface CustomDialogHeaderProps {
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;

  iconClassname?: string;
  titleClassname?: string;
  subtitleClassname?: string;
}
function CustomDialogHeader(props: CustomDialogHeaderProps) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn("stroke-primary", props.iconClassname)}
            />
          )}
          {props.title && (
            <p className={cn("text-xl text-primary", props.titleClassname)}>
              {" "}
              {props.title}{" "}
            </p>
          )}
          {props.subtitle && (
            <p
              className={cn(
                "text-sm  text-muted-foreground",
                props.subtitleClassname
              )}>
              {" "}
              {props.subtitle}{" "}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}

export default CustomDialogHeader;
