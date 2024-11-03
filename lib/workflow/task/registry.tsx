import { ExtractTextFromElementTask } from "./extractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHTMLTask } from "./pageToHTML";

import { TaskType } from "@/types/taskType";
import { WorkflowTask } from "@/types/workflow";

type Registry = {
  [k in TaskType]: WorkflowTask & {
    type: k;
  };
};
export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
