import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { JSONContentGenerator } from "./JSONContentGenerator";
import { MarkdonwContentGenerator } from "./MarkdonwContentGenerator";
import { loadMarkdownFile } from "../MarkdownPost";
import { logErrorAndExit } from "../utils";
import { ContentGenerator } from "./ContentGenerator";
import { CURR_PATH } from "../constant";
import { getConfig, Mode } from "../config";

const contentGeneratorMap = new Map<string, ContentGenerator>();
contentGeneratorMap.set(Mode.Gitbook, new MarkdonwContentGenerator);
contentGeneratorMap.set(Mode.JSON, new JSONContentGenerator());


export function getAllMDFilePath(): string[] | undefined {
  const { directories, configPath } = getConfig();
  if (directories && Array.isArray(directories) && directories.length) {
    const filePaths: string[] = [];
    directories.forEach(dir => {
      const currPath = path.join(CURR_PATH, dir);
      if (fs.existsSync(currPath) && fs.statSync(currPath).isDirectory()) {
        Array.prototype.push.apply(
          filePaths,
          glob.sync('**/*.md', {
            cwd: currPath,
            absolute: true,
          }),
        );
      }
    });
    filePaths.forEach(filepath => {
      console.log('will read file: ', filepath);
    });
    return filePaths;
  }
  logErrorAndExit(
    `${path.relative(CURR_PATH, configPath)} must have a Array property: 'directories'`,
  );
  return;
}


/**
 * generate posts content
 *
 * @export
 * @param {String[]} filePaths
 * @param {Object} {force = false}
 */
export async function generateContent(force: boolean = false): Promise<void> {
  const filepaths = getAllMDFilePath();
  if (filepaths) {
    const { mode } = getConfig();
  
    const postPromises = filepaths
      .map(filepath => loadMarkdownFile(filepath, force));

    const posts = await Promise.all(postPromises);

    contentGeneratorMap.get(mode)!.generate(posts);
  }

  return;
}
