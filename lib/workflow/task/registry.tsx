import { ExtractTextFromElementTask } from "./extractTextFromElement";
import { LaunchBrowserTask } from "./launchBrowser";
import { PageToHTMLTask } from "./pageToHTML";

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
