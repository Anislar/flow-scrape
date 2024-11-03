import { AppNodeMissingInputs, IAppNode } from "@/types/appNode";
import {
  ExecutionWorkflowPlan,
  ExecutionWorkflowPlanPhase,
  FlowExecutionPlanValidationError,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

type TFlowToExecutionPlan = {
  executionPlan?: ExecutionWorkflowPlan;
  error?: {
    type: FlowExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
};
export function FlowToExecutionPlan(
  nodes: IAppNode[],
  edges: Edge[]
): TFlowToExecutionPlan {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );
  if (!entryPoint) {
    return {
      error: {
        type: FlowExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }
  const inputsWithError: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInput(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithError.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }
  const executionPlan: ExecutionWorkflowPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];
  planned.add(entryPoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: ExecutionWorkflowPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already planned
        continue;
      }
      const invalideInputs = getInvalidInput(currentNode, edges, planned);

      if (invalideInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // if all incomers are planned  and there are still invalid inputs
          // this is means this particular node is invalid
          inputsWithError.push({
            nodeId: currentNode.id,
            inputs: invalideInputs,
          });
        } else {
          continue;
        }
      }
      nextPhase.nodes.push(currentNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }

    executionPlan.push(nextPhase);
  }
  if (inputsWithError.length > 0) {
    return {
      error: {
        type: FlowExecutionPlanValidationError.INVALID_INPUT,
        invalidElements: inputsWithError,
      },
    };
  }
  return { executionPlan };
}

function getInvalidInput(
  currentNode: IAppNode,
  edges: Edge[],
  planned: Set<string>
) {
  const invalidInput: string[] = [];
  const inputs = TaskRegistry[currentNode.data.type].inputs;
  for (const input of inputs) {
    const inputValue = currentNode.data.inputs[input.name];
    const inputValueProvided = inputValue?.length > 0;
    if (inputValueProvided) {
      // this input ise fine
      continue;
    }
    // if a value is not provided, check if it is connected
    const incommingEdge = edges.filter(
      (edge) => edge.target === currentNode.id
    );
    const inputLinkedToOutput = incommingEdge.find(
      (edge) => edge.targetHandle === input.name
    );
    const requiredInputPorvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);
    if (requiredInputPorvidedByVisitedOutput) {
      // the input required and provided by visited output
      continue;
    } else if (!input.required) {
      // if the input is not required,  but there is an output connected to it
      // we check if the output is visited
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // the output is provide a value to input
        continue;
      }
    }
    invalidInput.push(input.name);
  }
  return invalidInput;
}
