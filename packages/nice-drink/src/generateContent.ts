import { generateJSONContent } from "./JSONContent";
import { generateMarkdonwContent } from "./MarkdonwContent";
import { loadMarkdownFile } from "./MarkdownPost";
import { getConfig, Mode } from "./utils";

/**
 * generate posts content
 *
 * @export
 * @param {String[]} filePaths
 * @param {Object} {force = false}
 */
export async function generateContent(filePaths: string[], force: boolean = false) {
  const { mode } = getConfig();
  const postPromises = filePaths
    .map(filepath => loadMarkdownFile(filepath, force));

  const posts = await Promise.all(postPromises)
  if (mode.toLowerCase() === Mode.Gitbook) {
    generateMarkdonwContent(posts);
  } else if (mode.toLowerCase() === Mode.JSON) {
    generateJSONContent(posts);
  }
}
