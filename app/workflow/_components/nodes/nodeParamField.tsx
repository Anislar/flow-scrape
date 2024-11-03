import { useReactFlow } from "@xyflow/react";

import { TaskParam, TaskParamType } from "@/types/taskType";
import StringParam from "./param/stringParam";
import { IAppNode } from "@/types/appNode";
import { useCallback } from "react";
import BrowserInstanceParam from "./param/browserInstanceParam";

function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();

  const node = getNode(nodeId) as IAppNode;
  const value = node?.data?.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data?.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node?.data?.inputs, nodeId, param.name, updateNodeData]
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParam={updateNodeParamValue}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParam={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented.</p>
        </div>
      );
  }
}

export default NodeParamField;
