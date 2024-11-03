"use client";
import { useId, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ParamProps } from "@/types/appNode";

function StringParam({ param, value, updateNodeParam }: ParamProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const id = useId();

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex ">
        {param.name}
        {param.required && <span className="text-red-400 px-0.5">*</span>}
      </Label>
      <Input
        className="text-xs"
        placeholder="Enter value here"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        id={id}
        onBlur={(e) => updateNodeParam(e.target.value)}
      />
      {param.helperText && (
        <p className=" px-2 text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
