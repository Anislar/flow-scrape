import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./taskType";

export interface IAppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}
export interface IAppNode extends Node {
  data: IAppNodeData;
}
export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParam: (newValue: string) => void;
}
