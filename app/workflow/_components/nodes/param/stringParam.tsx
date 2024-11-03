"use client";
import { useEffect, useId, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ParamProps } from "@/types/appNode";

function StringParam({ param, value, updateNodeParam, disabled }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex ">
        {param.name}
        {param.required && <span className="text-red-400 px-0.5">*</span>}
      </Label>
      <Component
        disabled={disabled}
        className="text-xs"
        placeholder="Enter value here"
        value={internalValue || ""}
        onChange={(e: any) => setInternalValue(e.target.value)}
        id={id}
        onBlur={(e: any) => updateNodeParam(e.target.value)}
      />
      {param.helperText && (
        <p className=" px-2 text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
